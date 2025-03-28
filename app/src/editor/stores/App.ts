import { t } from 'i18next';
import { action, computed, makeObservable, observable } from 'mobx';
import type { ActionConfig } from '@/editor/actions/type';
import { WidgetStore } from '@/editor/stores/WidgetStore';
import { AppApi, PageApi } from '@/services/api';
import type { AppResponse } from '@/services/responses';
import type {
  MessageManager,
  ModalManager,
  NotificationManager,
} from '@/stores';
import { BaseStore, EventManager } from '@/stores';
import type { AppRunningMode, ArrayValues } from '@/types';
import { PageType } from '@/types';
import { TableStore } from '../../database/stores/TableStore';
import { AppPage } from './AppPage';

const requestKeys = [
  'fetchPages',
  'fetchApp',
  'modifyTitle',
  'changeFavicon',
  'saveData',
  'deletePage',
  'updatePage',
  'addPage',
  'reorderPage',
  'restore',
] as const;

export class App extends BaseStore<ArrayValues<typeof requestKeys>> {
  readonly id: string = '';
  readonly mode: AppRunningMode;

  readonly widgetStore: WidgetStore;
  readonly message: MessageManager;
  readonly modal: ModalManager;
  readonly notification: NotificationManager;
  readonly eventManager: EventManager;
  readonly tableStore: TableStore;
  readonly actions: ActionConfig[];

  @observable private _curPageId?: string;
  @observable private _title: string = '';
  @observable private _favicon: string = '';
  @observable private _workspaceName: string = '';
  @observable private _workspaceId: string = '';
  @observable private _info: AppResponse = {} as any;
  @observable.shallow private _pages: AppPage[] = [];

  constructor(
    id: string,
    mode: AppRunningMode,
    actions: ActionConfig[],
    messageManager: MessageManager,
    notificationManager: NotificationManager,
    modalManager: ModalManager,
  ) {
    super(requestKeys);
    makeObservable(this);
    this.id = id;
    this.mode = mode;
    this.actions = actions;
    this.message = messageManager;
    this.notification = notificationManager;
    this.modal = modalManager;
    this.eventManager = new EventManager();
    this.tableStore = new TableStore('id');
    this.widgetStore = new WidgetStore();

    this.listenNormalActions(actions);
    this.fetchApp();
  }

  private listenNormalActions(actions: ActionConfig[]) {
    actions
      .filter((item) => item.type === 'normal')
      .forEach((action) => {
        this.eventManager.on(
          action.name,
          (args) =>
            (this.mode === 'production' || this.mode === 'preview') &&
            action.handler?.(args),
        );
      });
  }

  @computed
  get title() {
    return this._title;
  }

  @computed
  get favicon() {
    return this._favicon;
  }

  @computed
  get workspaceName() {
    return this._workspaceName;
  }

  @computed
  get workspaceId() {
    return this._workspaceId;
  }

  @computed
  get info() {
    return this._info;
  }

  @computed
  get pages() {
    return this._pages.slice().sort((a, b) => a.order - b.order);
  }

  @computed
  get curPage() {
    return this.findPage(this._curPageId);
  }

  @computed
  get nodes() {
    return this._pages.flatMap((page) => page.nodes);
  }

  @computed
  get pageIds() {
    return this._pages.map((page) => page.id);
  }

  @action
  setCurPage(id: string) {
    this._curPageId = id;
  }

  checkIdIsUnique(id: string) {
    return !this.nodes.find((node) => node.id === id);
  }

  @action
  async modifyTitle(title: string) {
    return (
      await this.request(this.requestKeys.modifyTitle, AppApi.modifyTitle, {
        id: this.id,
        title,
      })
    ).finish(() => {
      this._title = title;
    });
  }

  @action
  async changeFavicon(favicon: string) {
    return (
      await this.request(this.requestKeys.changeFavicon, AppApi.changeFavicon, {
        id: this.id,
        favicon,
      })
    ).finish(() => {
      this._favicon = favicon;
    });
  }

  @action
  findPage(id?: string) {
    return this._pages.find((page) => page.id === id);
  }

  @action
  async restore(historyId: string) {
    return await this.request(
      this.requestKeys.restore,
      AppApi.restore,
      historyId,
    );
  }
  @action
  async reorderPage(id: string, toPId: string | null, toIndex: number) {
    const page = this.findPage(id);
    if (!page) {
      return { success: false, message: t('Page not found') };
    }

    this._pages.forEach((item) => {
      if (item.parentId === page.parentId && item.order > page.order) {
        item.modifyInfo({ order: item.order - 1 });
      }
    });

    this._pages.forEach((item) => {
      if (item.parentId === toPId && item.order >= toIndex) {
        item.modifyInfo({ order: item.order + 1 });
      }
    });

    page.modifyInfo({ parentId: toPId, order: toIndex });

    this._pages = this._pages.map((item) => item);

    return (
      await this.request(this.requestKeys.reorderPage, PageApi.reorder, {
        id,
        toParentId: toPId,
        toIndex,
      })
    ).fail(() => {
      this.fetchPages();
    });
  }

  @action
  async deletePage(id: string) {
    return (
      await this.request(this.requestKeys.deletePage, PageApi.delete, id)
    ).finish(() => {
      this._pages = this._pages.filter((p) => p.id !== id);
      this._curPageId = this._pages[0]?.id;
    });
  }

  @action
  async addPage(
    type: PageType,
    parentId: string | null,
    path: string,
    title: string,
    description: string,
    content: string,
  ) {
    return (
      await this.request(this.requestKeys.addPage, PageApi.add, {
        type,
        parentId,
        appId: this.id,
        path,
        title,
        description,
        content,
      })
    ).finish(({ data }) => {
      if (data) {
        const newPage = new AppPage(this, data);
        this._pages = [...this._pages, newPage];
      }
    });
  }

  @action
  async updatePage(
    id: string,
    path: string,
    title: string,
    description?: string,
  ) {
    return (
      await this.request(this.requestKeys.updatePage, PageApi.update, {
        id,
        path,
        title,
        description,
      })
    ).finish(() => {
      this._pages = this._pages.map((p) => {
        if (p.id === id) {
          p.modifyInfo({ path, title, description });
        }
        return p;
      });
    });
  }

  @action
  async saveData(comment: string, content: string) {
    if (!this.curPage) {
      return {
        success: false,
        message: t('No page selected'),
      };
    }

    const data = {
      id: this.curPage?.id,
      comment,
      content,
    };

    const resp = await this.request(
      this.requestKeys.saveData,
      PageApi.updateContent,
      data,
    );

    return resp;
  }

  @action
  async fetchPages() {
    return (
      await this.request(this.requestKeys.fetchPages, PageApi.getList, this.id)
    ).finish(({ data }) => {
      if (data) {
        this._pages = data.map((item) => new AppPage(this, item));
        this._curPageId = this._pages[0]?.id;
      }
    });
  }

  @action
  async fetchApp() {
    return (
      await this.request(this.requestKeys.fetchApp, AppApi.get, this.id)
    ).finish(({ data }) => {
      if (!data) return;

      this._workspaceName = data.workspaceName;
      this._workspaceId = data.workspaceId;
      this._title = data.title;
      this._favicon = data.favicon || '';
      this._info = data;
      this._pages = data.pages.map((item) => new AppPage(this, item));
      this._curPageId = this._pages.filter(
        (item) => item.type !== PageType.GROUP,
      )[0]?.id;
    });
  }
}

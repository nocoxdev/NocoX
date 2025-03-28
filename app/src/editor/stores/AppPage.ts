import { t } from 'i18next';
import { isArray, isString, keys } from 'lodash-es';
import { action, computed, makeObservable, observable } from 'mobx';
import type { AppPageResponse } from '@/services/responses';
import { BaseStore, HistoryManager } from '@/stores';
import type {
  AppRunningMode,
  ArrayValues,
  NodeEvent,
  PageNodeJson,
  WidgetTypeConfig,
} from '@/types';
import { generateKey } from '@/utils/helpers';
import { genJSX } from '../codegen';
import type { App } from './App';
import { PageNode } from './PageNode';

const requestKeys = [] as const;

type PageInfo = Pick<
  AppPageResponse,
  'path' | 'description' | 'type' | 'enabled' | 'title' | 'order' | 'parentId'
>;

export class AppPage extends BaseStore<ArrayValues<typeof requestKeys>> {
  readonly app: App;

  readonly history: HistoryManager<string>;

  @observable private _id: string;
  @observable.ref private _info: PageInfo;
  @observable.shallow private _nodes: PageNode[] = [];

  constructor(app: App, info: AppPageResponse) {
    super(requestKeys);
    makeObservable(this);
    this.app = app;
    this._id = info.id;
    this._info = info;
    this.initNode(info.content ?? '');

    this.history = new HistoryManager(this.jsonString);
  }

  @action
  private initNode(content: string) {
    if (content) {
      try {
        const json = isString(content) ? JSON.parse(content) : content;
        this._nodes = (isArray(json) ? json : [json]).flatMap((item, index) =>
          this.parseJson(item, '', index, 'children', true),
        );
      } catch (e) {
        this.app.message.error((e as Error).message);
      }
    }
  }

  @computed
  get nodes() {
    return this._nodes;
  }

  @computed
  get type() {
    return this._info.type;
  }

  @computed
  get ids() {
    return this._nodes.map((item) => item.id);
  }

  @computed
  get rootNodes() {
    return this._nodes.filter((item) => item.name === 'page');
  }

  @computed
  get path() {
    return this._info.path;
  }

  get parentId() {
    return this._info.parentId;
  }

  @computed
  get title() {
    return this._info.title;
  }

  @computed
  get description() {
    return this._info.description;
  }

  @computed
  get id() {
    return this._id;
  }

  @computed
  get order() {
    return this._info.order;
  }

  set order(order: number) {
    this._info = { ...this._info, order };
  }

  @computed
  get json() {
    return this.rootNodes.map((item) => item.json);
  }

  @computed
  get jsonString() {
    return JSON.stringify(this.json);
  }

  @computed
  get info() {
    return this._info;
  }

  @action
  forceUpdate() {
    this._nodes = this._nodes;
  }

  @action
  modifyInfo(info: Partial<PageInfo>) {
    this._info = { ...this._info, ...info };
  }

  render(mode: AppRunningMode) {
    try {
      return this.rootNodes
        .sort((a, b) => a.index - b.index)
        .map((node) => genJSX(node, this.app.widgetStore.widgets, mode));
    } catch (e) {
      return null;
    }
  }

  @action
  redo() {
    this.history.redo();
    const present = this.history.present;
    if (present) {
      this.initNode(present);
    }
  }

  @action
  undo() {
    this.history.undo();
    const present = this.history.present;
    if (present) {
      this.initNode(present);
    }
  }

  @action
  setId(id: string) {
    this._id = id;
  }

  @action
  toggleNodeVisble(id?: string) {
    const node = this.findNode(id);
    if (!node) return;
    node.toggleVisble();
    this._nodes = this.nodes.map((item) => item);
  }

  @action
  removeNode(id?: string) {
    const node = this.findNode(id);
    if (!node) return;

    const deleteIds = node.descendants.map((item) => item.id).concat(node.id);

    this._nodes.forEach((item) => {
      if (item.pid === node.pid && item.index > node.index) {
        item.changeIndex(item.index - 1);
      }
    });

    this._nodes = this._nodes.filter((item) => !deleteIds.includes(item.id));
    this.history.set(this.jsonString);
  }

  @action
  removeNodes(ids?: string[]) {
    const nodes = this._nodes.filter((item) => ids?.includes(item.id));
    if (!nodes) return;

    const deleteIds = nodes
      .flatMap((item) => item.descendants.map((item) => item.id))
      .concat(nodes.map((item) => item.id));

    this._nodes = this._nodes.filter((item) => !deleteIds.includes(item.id));
    this.history.set(this.jsonString);
  }

  @action
  addNode(
    pid: string,
    index: number,
    widgetName: string,
    attrName: string,
    ignoreRepeatId: boolean,
  ) {
    const widget = this.app.widgetStore.find(widgetName);

    if (!widget) return;

    const nodes: PageNode[] = [];

    if (!widget.defaultTemplate) {
      const node = this.createNode(
        undefined,
        pid,
        index,
        widget,
        attrName,
        undefined,
        true,
        ignoreRepeatId,
      );
      nodes.push(node);
    } else {
      const result = this.parseJson(
        widget.defaultTemplate as PageNodeJson,
        pid,
        index,
        attrName,
        ignoreRepeatId,
      );
      nodes.push(...result);
    }

    this._nodes.forEach((item) => {
      if (item.pid === pid && item.index >= index) {
        item.changeIndex(item.index + 1);
      }
    });

    this._nodes = this._nodes.concat(nodes);
    this.history.set(this.jsonString);
  }

  @action
  addNodes(pid: string, startIndex: number, nodes: PageNode[]) {
    nodes.forEach((item) => {
      if (item.pid === pid) {
        item.changeIndex(item.index + startIndex);
      }
    });
    this._nodes = this._nodes.concat(nodes);
    this.history.set(this.jsonString);
  }

  @action
  copyNode(id?: string) {
    const node = this.findNode(id);

    if (!node) return;

    const maxCount = node?.parent?.widget.limit?.childrenMaxCount;
    const childrenCount = node.parent?.children.length || 0;

    if (maxCount !== undefined && maxCount === childrenCount) {
      this.app.message.error(t('The maximum number of children is reached'));
      return;
    }

    const copyNodes: PageNode[] = [];

    const copy = (node: PageNode, pid: string, index: number) => {
      const newNode = this.createNode(
        undefined,
        pid,
        index,
        node.widget,
        node.attrName,
        node.customLabel,
        node.visible,
        false,
        node.props.record,
        node.styles.record,
        node.events.list,
      );

      copyNodes.push(newNode);

      this._nodes
        .filter((item) => item.pid === node.id)
        .forEach((item, index) => copy(item, newNode.id, index));
    };

    copy(node, node.pid, node.index + 1);

    this._nodes.forEach((item) => {
      if (item.pid === node.pid && item.index > node.index) {
        item.changeIndex(item.index + 1);
      }
    });

    this._nodes = this._nodes.concat(copyNodes);
    this.history.set(this.jsonString);
  }

  @action
  moveNode(fromId: string | undefined, toPId: string, toIndex: number) {
    const node = this.findNode(fromId);
    if (!node) return;

    this._nodes.forEach((item) => {
      if (item.pid === node.pid && item.index > node.index) {
        item.changeIndex(item.index - 1);
      }
    });

    this._nodes.forEach((item) => {
      if (item.pid === toPId && item.index >= toIndex) {
        item.changeIndex(item.index + 1);
      }
    });

    this._nodes = this._nodes.map((item) => item);

    node.changeIndex(toIndex, toPId);

    this.history.set(this.jsonString);
  }

  findNode(id?: string) {
    return this._nodes.find((node) => node.id === id);
  }

  parseJson(
    json: PageNodeJson,
    pid: string,
    index: number,
    attrName: string,
    ignoreRepeatId: boolean = false,
  ): PageNode[] {
    const nodes: PageNode[] = [];

    const widget = this.app.widgetStore.find(json.name);

    if (widget) {
      const node = this.createNode(
        json.id,
        pid,
        index,
        widget,
        attrName,
        json.label,
        json.visible === undefined ? true : json.visible,
        ignoreRepeatId,
        json.props,
        json.styles,
        json.events,
      );

      nodes.push(node);

      keys(json.elements || {}).forEach((key) => {
        const child = json.elements?.[key];
        if (child) {
          const children = isArray(child) ? child : [child];

          for (let i = 0; i < children.length; i++) {
            const result = this.parseJson(
              children[i],
              node.id,
              i,
              key,
              ignoreRepeatId,
            );

            nodes.push(...result);
          }
        }
      });
    }

    return nodes;
  }

  private createNode(
    id: string | undefined,
    pid: string,
    index: number,
    widget: WidgetTypeConfig,
    attrName: string,
    label: string | undefined,
    visible: boolean | undefined,
    ignoreRepeatId: boolean,
    defaultProps?: Record<string, any>,
    defaultStyles?: Record<string, any>,
    defaultEvents?: NodeEvent[],
  ) {
    const _id = id || generateKey();

    if (!ignoreRepeatId) {
      const unique = this.app.checkIdIsUnique(_id);

      if (!unique) {
        const errorMsg = t('ID is repeat, please retry.');
        this.app.message.error(errorMsg);
        throw new Error(errorMsg);
      }
    }
    return new PageNode(
      this.app,
      this,
      _id,
      pid,
      index,
      widget,
      attrName,
      label,
      visible,
      defaultProps,
      defaultStyles,
      defaultEvents,
    );
  }
}

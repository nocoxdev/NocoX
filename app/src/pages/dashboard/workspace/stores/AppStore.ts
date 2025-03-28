import { action, computed, makeObservable, observable } from 'mobx';
import { AppApi } from '@/services/api';
import type { AppResponse } from '@/services/responses';
import { BaseStore } from '@/stores';
import type { ArrayValues, ExtractParameterType } from '@/types';
import { App } from './App';

const requestKeys = ['loadList', 'remove', 'create'] as const;

export class AppStore extends BaseStore<ArrayValues<typeof requestKeys>> {
  readonly workspaceId: string;

  @observable private _apps: App[] = [];
  constructor(workspaceId: string) {
    super(requestKeys);
    makeObservable(this);
    this.workspaceId = workspaceId;
  }

  @computed
  get apps() {
    return this._apps;
  }

  @action
  async loadList(pageIndex: number = 0, pageSize: number = 10) {
    const params = { workspaceId: this.workspaceId, pageIndex, pageSize };

    return (
      await this.request(this.requestKeys.loadList, AppApi.getPageList, params)
    ).finish(({ data }) => {
      if (!data) return;
      this._apps = data.items.map((item: AppResponse) => new App(this, item));
    });
  }

  @action
  async create(data: ExtractParameterType<typeof AppApi.create>) {
    return (
      await this.request(this.requestKeys.create, AppApi.create, data)
    ).finish(() => this.loadList());
  }

  @action
  remove(app: App) {
    this._apps = this._apps.filter((item) => item.id !== app.id);
  }
}

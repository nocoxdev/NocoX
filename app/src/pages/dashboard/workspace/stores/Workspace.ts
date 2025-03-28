import { action, computed, makeObservable, observable } from 'mobx';
import { WorkspaceApi } from '@/services/api';
import { BaseStore } from '@/stores';
import type { ArrayValues } from '@/types';
import { AppStore } from './AppStore';

const requestKeys = ['load'] as const;

export class Workspace extends BaseStore<ArrayValues<typeof requestKeys>> {
  readonly id: string;
  readonly appStore: AppStore;

  @observable.ref private _title: string = '';

  constructor(id: string) {
    super(requestKeys);
    makeObservable(this);
    this.id = id;
    this.appStore = new AppStore(id);
    this.load();
  }

  @computed
  get title() {
    return this._title;
  }

  @action
  async load() {
    return (
      await this.request(this.requestKeys.load, WorkspaceApi.get, this.id)
    ).finish(({ data }) => {
      this._title = data?.title ?? '';
      this.appStore.loadList();
    });
  }
}

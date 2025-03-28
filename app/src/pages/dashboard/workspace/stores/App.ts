import { action, computed, makeObservable, observable } from 'mobx';
import { AppApi } from '@/services/api';
import type { AppResponse } from '@/services/responses';
import { BaseStore } from '@/stores';
import type { ArrayValues } from '@/types';
import type { AppStore } from './AppStore';

type AppDataType = Omit<AppResponse, 'pages'>;

const requestKeys = [
  'load',
  'update',
  'changeFavicon',
  'changeColor',
  'rename',
  'delete',
] as const;

export class App extends BaseStore<ArrayValues<typeof requestKeys>> {
  readonly id: string;
  readonly store: AppStore;
  @observable.ref private _data: AppDataType;

  constructor(store: AppStore, data: AppDataType) {
    super(requestKeys);
    this._data = data;
    this.id = data.id;
    this.store = store;
    makeObservable(this);
  }

  @computed
  get data() {
    return this._data;
  }

  @action
  async changeFavicon(favicon: string) {
    return (
      await this.request(this.requestKeys.changeFavicon, AppApi.changeFavicon, {
        id: this.id,
        favicon,
      })
    ).finish(() => {
      this._data = { ...this._data, favicon };
    });
  }

  @action
  async changeColor(color: string) {
    return (
      await this.request(this.requestKeys.changeColor, AppApi.changeColor, {
        id: this.id,
        color,
      })
    ).finish(() => {
      this._data = { ...this._data, color };
    });
  }

  @action
  async modifyTitle(title: string) {
    return (
      await this.request(this.requestKeys.rename, AppApi.modifyTitle, {
        id: this.id,
        title,
      })
    ).finish(() => {
      this._data = { ...this._data, title };
    });
  }

  @action
  async delete(id: string) {
    return (
      await this.request(this.requestKeys.delete, AppApi.delete, id)
    ).finish(() => this.store.remove(this));
  }
}

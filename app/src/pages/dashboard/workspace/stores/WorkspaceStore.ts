import { action, computed, makeObservable, observable } from 'mobx';
import { WorkspaceApi } from '@/services/api';
import type { WorkspaceResponse } from '@/services/responses';
import { BaseStore } from '@/stores';
import type { ArrayValues } from '@/types';

const requestKeys = ['loadList', 'create', 'update', 'delete'] as const;

export class WorkspaceStore extends BaseStore<ArrayValues<typeof requestKeys>> {
  @observable private _currentId: string = '';
  @observable private _workspaces: WorkspaceResponse[] = [];

  constructor() {
    super(requestKeys);
    makeObservable(this);
    this.fetch();
  }

  @computed
  get currentId() {
    return this._currentId;
  }

  @computed
  get current() {
    return this._workspaces.find((item) => item.id === this._currentId);
  }

  @computed
  get workspaces() {
    return this._workspaces;
  }

  find(id: string) {
    return this._workspaces.find((item) => item.id === id);
  }

  @action
  async fetch() {
    return (
      await this.request(this.requestKeys.loadList, WorkspaceApi.getList)
    ).finish(({ data }) => {
      if (!data) return;
      this._workspaces = data;
    });
  }

  @action
  async createWorkspace(title: string) {
    return (
      await this.request(this.requestKeys.create, WorkspaceApi.create, {
        title,
      })
    ).finish(() => this.fetch());
  }

  @action
  async deleteWorkspace(id: string) {
    return (
      await this.request(this.requestKeys.delete, WorkspaceApi.delete, id)
    ).finish(() => this.fetch());
  }

  @action
  async updateWorkspace(id: string, title: string) {
    return (
      await this.request(this.requestKeys.update, WorkspaceApi.modifyTitle, {
        id,
        title,
      })
    ).finish(() => this.fetch());
  }
}

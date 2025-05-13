import { action, computed, makeObservable, observable } from 'mobx';
import { TOKEN_KEY } from '@/constants';
import { AccountApi } from '@/services/api';
import type {
  ProfileResponse,
  UserPermissionResponse,
} from '@/services/responses';
import type { ArrayValues } from '@/types';
import { getRedirectUrl } from '@/utils/helpers';
import { BaseStore } from './BaseStore';

const requestKeys = [
  'fetch',
  'updateProfile',
  'changePassword',
  'getPermissions',
] as const;

export class User extends BaseStore<ArrayValues<typeof requestKeys>> {
  @observable private _token = localStorage.getItem(TOKEN_KEY) || '';
  @observable.ref private _profile: ProfileResponse | undefined = undefined;

  @observable.ref private _permissions: UserPermissionResponse[] = [];

  constructor() {
    super(requestKeys);
    makeObservable(this);
    this.fetchInfo();
  }

  @computed
  get profile() {
    return this._profile;
  }

  @computed
  get token() {
    return this._token;
  }

  @computed
  get permissions() {
    return this._permissions;
  }

  @computed
  get workspaceGranted() {
    return this._permissions.some((item) =>
      item.groupName.toLowerCase().includes('workspace'),
    );
  }

  @computed
  get initing() {
    return (
      this.requestStates.getPermissions.status === 'pending' ||
      this.requestStates.fetch.status === 'pending'
    );
  }

  @action
  setProfile(profile: ProfileResponse) {
    this._profile = profile;
  }

  @action
  setToken(token: string) {
    this._token = token;
  }

  @action
  clearToken() {
    this._token = '';
    localStorage.removeItem(TOKEN_KEY);
  }

  @action
  updateToken(token: string) {
    this._token = token;
    localStorage.setItem(TOKEN_KEY, token);
  }

  @action
  logout() {
    this.clearToken();
    this._profile = undefined;
    this._permissions = [];
  }

  @action
  async updateProfile(data: ProfileResponse) {
    return (
      await this.request(
        this.requestKeys.updateProfile,
        AccountApi.updateProfile,
        data,
      )
    ).finish(() => {
      this.setProfile(data);
    });
  }

  @action
  async changePassword(data: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) {
    return this.request(
      this.requestKeys.changePassword,
      AccountApi.changePassword,
      data,
    );
  }

  @action
  async fetchProfile() {
    return (
      await this.request(this.requestKeys.fetch, AccountApi.getProfile)
    ).finish(({ data }) => {
      data && this.setProfile(data);
    });
  }

  @action
  async fetchPermissions() {
    return (
      await this.request(
        this.requestKeys.getPermissions,
        AccountApi.getPermissions,
      )
    ).finish(({ data }) => {
      this._permissions = data || [];
    });
  }

  @action
  async fetchInfo() {
    if (localStorage.getItem(TOKEN_KEY)) {
      await this.fetchProfile();
      await this.fetchPermissions();
    } else {
      if (!window.location.pathname.includes('/login')) {
        window.location.href = getRedirectUrl('login');
      }
    }
  }
}

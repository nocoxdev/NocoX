import { t } from 'i18next';
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import type { BaseResponse } from '@/services/responses';

export type RequestStatus = 'pending' | 'done' | 'error';

export interface RequestState {
  status: RequestStatus;
  message?: string;
}

export class Response<T> implements BaseResponse<T> {
  success: boolean;
  message: string;
  data?: T;

  constructor(success: boolean, message: string, data?: T) {
    this.success = success;
    this.message = message;
    this.data = data;
  }

  finish(cb: (resp: Omit<BaseResponse<T>, 'success'>) => void) {
    if (this.success) {
      runInAction(() => cb({ message: this.message, data: this.data }));
    }
    return this;
  }

  fail(cb: (message: string) => void) {
    if (!this.success) runInAction(() => cb(this.message));
    return this;
  }
}

export class Request {
  @observable.ref private _state?: RequestState;

  constructor() {
    makeObservable(this);
    this._state = { status: 'done' };
  }

  @computed
  get state() {
    return this._state;
  }

  @action
  async runAsync<TArgs extends unknown[], TData>(
    api: (...args: TArgs) => Promise<BaseResponse<TData>>,
    ...args: TArgs
  ) {
    this._state = { status: 'pending' };
    try {
      const resp = await api(...args);
      runInAction(() => {
        this._state = {
          status: resp.success ? 'done' : 'error',
          message: resp.message,
        };
      });
      return new Response<TData>(
        resp.success ?? false,
        resp.message ?? '',
        resp.data,
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : t('Unknown error');
      runInAction(() => {
        this._state = { status: 'error', message };
      });
      return new Response<TData>(false, message);
    }
  }
}

import type { BaseResponse } from '@/services/responses';
import type { RequestState, Response } from './Request';
import { Request } from './Request';

type States<T extends string> = {
  [K in T]: RequestState;
};

export abstract class BaseStore<RequestType extends string> {
  private readonly _requests: Map<RequestType, Request> = new Map();
  private readonly _requestKeys: RequestType[];

  constructor(keys: readonly RequestType[]) {
    this._requestKeys = [...keys];
  }

  private getRequest(key: RequestType) {
    if (!this._requests.has(key)) {
      this._requests.set(key, new Request());
    }
    return this._requests.get(key)!;
  }

  get requestKeys() {
    return Object.fromEntries(this._requestKeys.map((key) => [key, key])) as {
      [K in RequestType]: K;
    };
  }

  get requestStates() {
    return Object.fromEntries(
      this._requestKeys.map((key) => [key, this.getRequest(key).state]),
    ) as States<RequestType>;
  }

  request<TArgs extends unknown[], TData>(
    key: RequestType,
    api: (...args: TArgs) => Promise<BaseResponse<TData>>,
    ...args: TArgs
  ): Promise<Response<TData>> {
    return this.getRequest(key).runAsync(api, ...args);
  }

  // @flow
  // *requestFlow<TArgs extends unknown[], TData>(
  //   key: RequestType,
  //   api: (...args: TArgs) => Promise<Response<TData>>,
  //   ...args: TArgs
  // ) {
  //   return yield* toFlowGeneratorFunction(this.request)(key, api, ...args);
  // }
}

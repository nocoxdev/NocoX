import type { BaseDataResponse } from './BaseResponse';

export interface MyAppResponse extends BaseDataResponse {
  appId: string;
  title: string;
  favicon?: string;
  color?: string;
  description?: string;
}

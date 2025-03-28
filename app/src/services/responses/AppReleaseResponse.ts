import type { BaseDataResponse } from './BaseResponse';

export interface AppReleaseResponse extends BaseDataResponse {
  title: string;
  favicon?: string;
  version: string;
  appId: string;
  onlineTime: string;
  offlineTime: string;
  creationTime: string;
  description?: string;
  offline: boolean;
}

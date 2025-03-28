import type { BaseDataResponse } from './BaseResponse';

export interface AppReleaseInfoResponse extends BaseDataResponse {
  title: string;
  favicon?: string;
  currentVersion?: string;
  description?: string;
}

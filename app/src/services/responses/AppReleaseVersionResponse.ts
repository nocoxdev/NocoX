import type { BaseDataResponse } from './BaseResponse';

export interface AppReleaseVersionResponse extends BaseDataResponse {
  title: string;
  version: string;
  description: string;
  favicon: string;
  releaseTime: string;
}

import type { BaseDataResponse } from './BaseResponse';

export interface AppReleaseVersionResponse extends BaseDataResponse {
  version: string;
  description: string;
  favicon: string;
  releaseTime: string;
}

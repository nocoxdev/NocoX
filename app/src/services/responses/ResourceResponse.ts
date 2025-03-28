import type { BaseDataResponse } from './BaseResponse';

export interface ResourceResponse extends BaseDataResponse {
  name: string;
  path: string;
  extension: string;
  creator: string;
  creationTime: string;
}

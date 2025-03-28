import type { BaseDataResponse } from './BaseResponse';

export interface AppHistoryResponse extends BaseDataResponse {
  appId: string;
  comment: string;
  creator: string;
  creationTime: string;
}

import type { BaseDataResponse } from './BaseResponse';

export interface AppDataResponse extends BaseDataResponse {
  appId: string;
  tableId: string;
  data: Record<string, any>;
  creator: string;
  creationTime: string;
  lastModifier: string;
  lastModificationTime: string;
}

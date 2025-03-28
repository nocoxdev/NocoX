import type { BaseDataResponse } from './BaseResponse';

export interface TableResponse extends BaseDataResponse {
  title: string;
  description: string;
  order: number;
}

import type { BaseDataResponse } from './BaseResponse';

export interface IconResponse extends BaseDataResponse {
  name: string;
  tags: string[];
  svg: string;
}

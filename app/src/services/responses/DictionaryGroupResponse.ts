import type { BaseDataResponse } from './BaseResponse';

export interface DictionaryGroupResponse extends BaseDataResponse {
  title: string;
  description?: string;
}

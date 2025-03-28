import type { BaseDataResponse } from './BaseResponse';

export interface DictionaryResponse extends BaseDataResponse {
  groupId: string;
  parentId?: string;
  name: string;
  title: string;
  description?: string;
  order: number;
  enabled: boolean;
  children: DictionaryResponse[];
}

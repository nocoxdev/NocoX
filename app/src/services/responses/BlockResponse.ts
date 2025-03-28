import type { BaseDataResponse } from './BaseResponse';

export interface BlockResponse extends BaseDataResponse {
  name: string;
  cover?: string;
  tags: string;
  content: string;
  isPublic: boolean;
  creationTime: string;
  description: string;
}

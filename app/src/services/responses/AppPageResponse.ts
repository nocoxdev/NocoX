import type { PageType } from '@/types';
import type { BaseDataResponse } from './BaseResponse';

export interface AppPageResponse extends BaseDataResponse {
  path: string;
  parentId: string | null;
  type: PageType;
  title: string;
  description: string;
  order: number;
  enabled: boolean;
  content?: string;
}

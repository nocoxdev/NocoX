import type { AppPageResponse } from './AppPageResponse';
import type { BaseDataResponse } from './BaseResponse';

export interface AppRunningResponse extends BaseDataResponse {
  title: string;
  favicon?: string;
  description?: string;
  pages: AppPageResponse[];
}

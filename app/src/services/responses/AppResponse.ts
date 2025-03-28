import type { AppPageResponse } from './AppPageResponse';
import type { BaseDataResponse } from './BaseResponse';

export interface AppResponse extends BaseDataResponse {
  title: string;
  color: string;
  favicon?: string;
  url?: string;
  lastModifier: string;
  workspaceId: string;
  workspaceName: string;
  lastModificationTime: string;
  pages: AppPageResponse[];
}

import type { BaseDataResponse } from './BaseResponse';

export enum RoleStatus {
  Normal,
  Forbbidden,
}

export interface RoleResponse extends BaseDataResponse {
  name: string;
  status: RoleStatus;
  description: string;
  creationTime: string;
}

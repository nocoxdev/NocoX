import type { BaseDataResponse } from './BaseResponse';

export enum PermissionType {
  Normal,
  Warning,
  Danger,
}

export interface PermissionResponse extends BaseDataResponse {
  name: string;
  type: PermissionType;
}

export interface PermissionGroupResponse extends BaseDataResponse {
  name: string;
  permissions: PermissionResponse[];
}

export interface RolePermissionsResponse {
  groups: PermissionGroupResponse[];
  grants: string[];
}

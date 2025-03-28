import type { BaseDataResponse } from './BaseResponse';
import type { RoleResponse } from './RoleResponse';

export enum UserStatus {
  Normal,
  Frozen,
}

export interface UserResponse extends BaseDataResponse {
  userName: string;
  email: string;
  avatar: string;
  phoneNumber: string;
  status: UserStatus;
  creationTime: string;
  description: string;
  roles: RoleResponse[];
}

import type { LoginInfoResponse, UserPermissionResponse } from '../responses';
import type { ProfileResponse } from '../responses/ProfileResponse';
import { Api } from './Api';

const baseUrl = '/account';

export const AccountApi = {
  async login(data: { email: string; password: string }) {
    const url = `${baseUrl}/login`;
    return Api.post<LoginInfoResponse>(url, data);
  },

  async logout(data: { name: string }) {
    const url = `${baseUrl}/create`;
    return Api.post(url, data);
  },

  async getProfile() {
    const url = `${baseUrl}/getProfile`;
    return Api.get<ProfileResponse>(url);
  },

  async getPermissions() {
    const url = `${baseUrl}/getPermissions`;
    return Api.get<UserPermissionResponse[]>(url);
  },

  async updateProfile(data: {
    userName: string;
    email: string;
    avatar: string;
    phoneNumber: string;
    description: string;
  }) {
    const url = `${baseUrl}/updateProfile`;
    return Api.post(url, data);
  },

  async changePassword(data: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) {
    const url = `${baseUrl}/changePassword`;
    return Api.post(url, data);
  },
};

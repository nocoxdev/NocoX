import type { QueryPageListParamsType } from '@/types';
import { type UserResponse } from '../responses';
import { Api } from './Api';

const baseUrl = '/user';

export const UserApi = {
  async create(data: {
    userName: string;
    email: string;
    phoneNumber: string;
    password: string;
    description: string;
  }) {
    const url = `${baseUrl}/create`;
    return Api.post(url, data);
  },

  async update(data: {
    id: string;
    userName: string;
    email: string;
    phoneNumber: string;
    password: string;
    description: string;
  }) {
    const url = `${baseUrl}/update`;
    return Api.post(url, data);
  },

  async getPageList(params: QueryPageListParamsType) {
    const url = `${baseUrl}/getPageList`;
    return Api.getPageListByQueryParams<UserResponse>(url, params);
  },

  async getList(params: { keywords: string }) {
    const url = `${baseUrl}/getList`;
    return Api.post<UserResponse[]>(url, params);
  },

  async get(id: string) {
    const url = `${baseUrl}/get`;
    return Api.get<UserResponse>(url, { id });
  },

  async delete(id: string) {
    const url = `${baseUrl}/delete`;
    return Api.post(url, { id });
  },

  async resetPassword(data: {
    id: string;
    newPassword: string;
    confirmPassword: string;
  }) {
    const url = `${baseUrl}/resetPassword`;
    return Api.post(url, data);
  },

  async freeze(id: string) {
    const url = `${baseUrl}/freeze`;
    return Api.post(url, { id });
  },

  async unfreeze(id: string) {
    const url = `${baseUrl}/unfreeze`;
    return Api.post(url, { id });
  },
};

import type { QueryPageListParamsType } from '@/types';
import type { RolePermissionsResponse, RoleResponse } from '../responses';
import { Api } from './Api';

const baseUrl = '/role';

export const RoleApi = {
  async create(data: { name: string; description: string }) {
    const url = `${baseUrl}/create`;
    return Api.post(url, data);
  },

  async update(data: { id: string; name: string; description: string }) {
    const url = `${baseUrl}/update`;
    return Api.post(url, data);
  },

  async getPageList(params: QueryPageListParamsType) {
    const url = `${baseUrl}/getPageList`;
    return Api.getPageListByQueryParams<RoleResponse>(url, params);
  },

  async getList() {
    const url = `${baseUrl}/getList`;
    return Api.getList<RoleResponse>(url);
  },

  async get(id: string) {
    const url = `${baseUrl}/get`;
    return Api.get<RoleResponse>(url, { id });
  },

  async delete(id: string) {
    const url = `${baseUrl}/delete`;
    return Api.post(url, { id });
  },

  async disable(id: string) {
    const url = `${baseUrl}/disable`;
    return Api.post(url, { id });
  },

  async enable(id: string) {
    const url = `${baseUrl}/enable`;
    return Api.post(url, { id });
  },

  async setPermissions(id: string, permissions: string[]) {
    const url = `${baseUrl}/setPermissions`;
    return Api.post(url, { id, permissions });
  },

  async getPermissions(id: string) {
    const url = `${baseUrl}/getPermissions`;
    return Api.get<RolePermissionsResponse>(url, { id });
  },
};

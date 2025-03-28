import type { PermissionGroupResponse } from '../responses';
import { Api } from './Api';

const baseUrl = '/permission';

export const PermissionApi = {
  async getList() {
    const url = `${baseUrl}/getList`;
    return Api.getList<PermissionGroupResponse>(url);
  },
};

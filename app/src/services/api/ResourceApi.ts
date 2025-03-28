import type { QueryPageListParamsType } from '@/types';
import { ResourceType } from '@/types';
import type { ResourceResponse } from '../responses';
import { Api } from './Api';

const baseUrl = '/resource';

export const ResourceApi = {
  async upload(file: any, type: ResourceType = ResourceType.Image) {
    const url = `${baseUrl}/upload`;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type.toString());

    return Api.post<ResourceResponse>(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  async getPageList(params: QueryPageListParamsType) {
    const url = `${baseUrl}/getpagelist`;

    return Api.getPageListByQueryParams<ResourceResponse>(url, params);
  },

  async getExtensions() {
    const url = `${baseUrl}/getExtensions`;
    return Api.getList<string>(url);
  },

  async get(id: string) {
    const url = `${baseUrl}/get`;
    return Api.get<ResourceResponse>(url, {
      id,
    });
  },

  async delete(id: string) {
    const url = `${baseUrl}/delete`;
    return Api.post(url, { id });
  },
};

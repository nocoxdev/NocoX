import type { DictionaryGroupResponse, PageRequestParams } from '../responses';
import { Api } from './Api';

const baseUrl = '/dictionaryGroup';

export const DictionaryGroupApi = {
  async create(data: Omit<DictionaryGroupResponse, 'id'>) {
    const url = `${baseUrl}/create`;
    return Api.post(url, data);
  },

  async update(data: DictionaryGroupResponse) {
    const url = `${baseUrl}/update`;
    return Api.post(url, data);
  },

  async delete(id: String) {
    const url = `${baseUrl}/delete`;
    return Api.post(url, { id });
  },

  async getPageList(
    params: PageRequestParams & {
      keywords?: string;
    },
  ) {
    const url = `${baseUrl}/getPageList`;
    return Api.getPageList<DictionaryGroupResponse>(url, params);
  },

  async getList(params?: { keywords: string }) {
    const url = `${baseUrl}/getList`;
    return Api.getList<DictionaryGroupResponse>(url, params);
  },
};

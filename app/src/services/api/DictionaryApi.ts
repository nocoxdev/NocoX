import type { DictionaryResponse, PageRequestParams } from '../responses';
import { Api } from './Api';

const baseUrl = '/dictionary';

export const dictionaryApi = {
  async add(data: Omit<DictionaryResponse, 'children' | 'id'>) {
    const url = `${baseUrl}/add`;
    return Api.post(url, data);
  },

  async update(data: Omit<DictionaryResponse, 'children'>) {
    const url = `${baseUrl}/update`;
    return Api.post(url, data);
  },

  async delete(id: string) {
    const url = `${baseUrl}/delete`;
    return Api.post(url, { id });
  },

  async enable(id: string) {
    const url = `${baseUrl}/enable`;
    return Api.post(url, { id });
  },

  async disable(id: string) {
    const url = `${baseUrl}/disable`;
    return Api.post(url, { id });
  },

  async getList(params: {
    groupId: string;
    keywords?: string;
    includeChildren?: boolean;
  }) {
    const url = `${baseUrl}/getList`;
    return Api.getList<DictionaryResponse>(url, params);
  },

  async getPageList(
    params: PageRequestParams & {
      groupId: string;
      keywords?: string;
    },
  ) {
    const url = `${baseUrl}/getPageList`;
    return Api.getPageList<DictionaryResponse>(url, params);
  },
};

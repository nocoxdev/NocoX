import type { PageType } from '@/types';
import type { AppPageResponse } from '../responses';
import { Api } from './Api';

const baseUrl = '/app/page';

export const PageApi = {
  async getList(appId: string) {
    const url = `${baseUrl}/getlist`;
    return Api.getList<AppPageResponse>(url, { appId });
  },

  async get(id: string) {
    const url = `${baseUrl}/get`;
    return Api.get<AppPageResponse>(url, { id });
  },

  async add(data: {
    type: PageType;
    parentId: string | null;
    appId: string;
    path: string;
    title: string;
    description?: string;
    content: string;
  }) {
    const url = `${baseUrl}/add`;
    return Api.post<AppPageResponse>(url, data);
  },

  async update(data: {
    id: string;
    path: string;
    title: string;
    description?: string;
  }) {
    const url = `${baseUrl}/update`;
    return Api.post<AppPageResponse>(url, data);
  },

  async reorder(data: {
    id: string;
    toParentId: string | null;
    toIndex: number;
  }) {
    const url = `${baseUrl}/reorder`;
    return Api.post(url, data);
  },

  async updateContent(data: { id: string; comment: string; content: string }) {
    const url = `${baseUrl}/updateContent`;
    return Api.post(url, data);
  },

  async delete(id: string) {
    const url = `${baseUrl}/delete`;
    return Api.post(url, { id });
  },
};

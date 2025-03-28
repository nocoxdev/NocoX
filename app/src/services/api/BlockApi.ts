import type { BlockType, QueryPageListParamsType } from '@/types';
import type { BlockResponse } from '../responses';
import { Api } from './Api';

const baseUrl = '/block';

export const BlockApi = {
  async getPageList(params: QueryPageListParamsType & { type: BlockType }) {
    const url = `${baseUrl}/getPageList`;
    return Api.getPageListByQueryParams<BlockResponse>(url, params);
  },

  async create(data: {
    name: string;
    cover: string;
    description: string;
    isPublic: boolean;
    content: string;
    tags: string[];
  }) {
    const url = `${baseUrl}/create`;
    return Api.post(url, data);
  },

  async delete(id: string) {
    const url = `${baseUrl}/delete`;
    return Api.post(url, { id });
  },
};

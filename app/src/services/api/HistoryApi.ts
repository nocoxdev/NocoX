import type { QueryPageListParamsType } from '@/types';
import type { AppHistoryResponse } from '../responses';
import { Api } from './Api';

const baseUrl = '/app/history';

export const HistoryApi = {
  async getPageList(
    params: QueryPageListParamsType & {
      appId: string;
    },
  ) {
    const url = `${baseUrl}/getPagelist`;
    return Api.getPageListByQueryParams<AppHistoryResponse>(url, params);
  },

  async comment(data: { id: string; comment: string }) {
    const url = `${baseUrl}/comment`;
    return Api.post(url, data);
  },

  async add(data: { appId: string; comment: string }) {
    const url = `${baseUrl}/add`;
    return Api.post(url, data);
  },
};

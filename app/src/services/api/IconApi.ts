import type { IconResponse, PageRequestParams } from '../responses';
import { Api } from './Api';

const baseUrl = '/icon';
export const IconApi = {
  async getIconList(params: PageRequestParams & { keywords: string }) {
    const url = `${baseUrl}/getlist`;

    return Api.getPageList<IconResponse>(url, params);
  },
};

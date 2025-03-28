import type { PageRequestParams, TemplateResponse } from '../responses';
import { Api } from './Api';

const baseUrl = '/workspace';

export const TemplateApi = {
  async getPageList(params: PageRequestParams) {
    const url = `${baseUrl}/getPageList`;
    return Api.getPageList<TemplateResponse>(url, params);
  },
};

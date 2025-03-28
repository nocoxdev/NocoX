import type { IFilterInfo } from '@/components/DataFilter/type';
import type { ISortItem } from '@/components/DataSort/type';
import type { QueryPageListParamsType } from '@/types';
import { Api } from './Api';

const baseUrl = '/app/data';

export const AppDataApi = {
  async add(tableId: string, data: Record<string, any>) {
    const url = `${baseUrl}/add`;
    return Api.post(url, {
      tableId,
      data,
    });
  },

  async update(tableId: string, id: string, data: Record<string, any>) {
    const url = `${baseUrl}/update`;
    return Api.post(url, { tableId, id, data });
  },

  async delete(tableId: string, ids: string[]) {
    const url = `${baseUrl}/delete`;
    return Api.post(url, { tableId, ids });
  },

  async get(tableId: string, userId?: string) {
    const url = `${baseUrl}/getByUser`;
    return Api.get<Record<string, any>>(url, {
      tableId,
      userId,
    });
  },

  async getById(tableId: string, id: string) {
    const url = `${baseUrl}/getById`;
    return Api.get<Record<string, any>>(url, {
      tableId,
      id,
    });
  },

  async getDataCount(params: {
    tableId: string;
    filters?: IFilterInfo[];
    keywords?: string;
  }) {
    const url = `${baseUrl}/getDataCount`;
    return Api.post<number>(url, params);
  },

  async getList(params: {
    tableId: string;
    filter?: IFilterInfo;
    sorts?: ISortItem[];
    keywords?: string;
  }) {
    const url = `${baseUrl}/getList`;
    return Api.post<Record<string, any>[]>(url, params);
  },

  async getDataList(tableId: string) {
    const url = `${baseUrl}/getDataList`;
    return Api.get<Record<string, any>[]>(url, { tableId });
  },

  async getPageList(
    params: QueryPageListParamsType & {
      tableId: string;
    },
  ) {
    const url = `${baseUrl}/getPageList`;
    return Api.getPageListByQueryParams<Record<string, any>>(url, params);
  },
};

import type { UiType } from '@/types';
import type { TableColumnResponse, TableResponse } from '../responses';
import { Api } from './Api';

const baseUrl = '/database';

export const DatabaseApi = {
  async createTable(data: { title: string; description: string }) {
    const url = `${baseUrl}/createTable`;
    return Api.post<TableResponse>(url, data);
  },

  async deleteTable(id: string) {
    const url = `${baseUrl}/deleteTable`;
    return Api.post(url, { id: id });
  },

  async updateTable(data: { id: string; title: string; description: string }) {
    const url = `${baseUrl}/updateTable`;
    return Api.post(url, data);
  },

  async reorderTable(tableId: string, toIndex: number) {
    const url = `${baseUrl}/reorderTable`;
    return Api.post(url, { id: tableId, toIndex });
  },

  async addTableColumn(data: {
    tableId: string;
    columnName: string;
    title: string;
    description?: string;
    uiType: UiType;
    required: boolean;
  }) {
    const url = `${baseUrl}/addTableColumn`;
    return Api.post(url, data);
  },

  async updateTableColumn(data: {
    id: string;
    columnName: string;
    title: string;
    uiType: UiType;
    required: boolean;
  }) {
    const url = `${baseUrl}/updateTableColumn`;
    return Api.post(url, data);
  },

  async deleteTableColumn(columnId: string) {
    const url = `${baseUrl}/deleteTableColumn`;
    return Api.post(url, { id: columnId });
  },

  async resizeTableColumn(columnId: string, width: number) {
    const url = `${baseUrl}/resizeTableColumn`;
    return Api.post(url, { id: columnId, width });
  },

  async reorderTableColumn(columnId: string, toIndex: number) {
    const url = `${baseUrl}/reorderTableColumn`;
    return Api.post(url, { id: columnId, toIndex });
  },

  async showTableColumn(columnIds: string[]) {
    const url = `${baseUrl}/showTableColumn`;
    return Api.post(url, { ids: columnIds });
  },

  async hideTableColumn(columnIds: string[]) {
    const url = `${baseUrl}/hideTableColumn`;
    return Api.post(url, { ids: columnIds });
  },

  async getTableList() {
    const url = `${baseUrl}/getTables`;
    return Api.getList<TableResponse>(url);
  },

  async getTableColumns(tableId: string) {
    const url = `${baseUrl}/getTableColumns`;
    return Api.getList<TableColumnResponse>(url, { tableId });
  },
};

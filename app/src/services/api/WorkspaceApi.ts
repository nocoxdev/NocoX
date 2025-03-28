import type { QueryPageListParamsType } from '@/types';
import type { UserResponse, WorkspaceResponse } from '../responses';
import { Api } from './Api';

const baseUrl = '/workspace';

export const WorkspaceApi = {
  async get(id: string) {
    const url = `${baseUrl}/get`;
    return Api.get<WorkspaceResponse>(url, { id });
  },

  async getList() {
    const url = `${baseUrl}/getList`;
    return Api.getList<WorkspaceResponse>(url);
  },

  async create(data: { title: string }) {
    const url = `${baseUrl}/create`;
    return Api.post<WorkspaceResponse>(url, data);
  },

  async delete(id: string) {
    const url = `${baseUrl}/delete`;
    return Api.post(url, { id });
  },

  async modifyTitle(data: { id: string; title: string }) {
    const url = `${baseUrl}/modifyTitle`;
    return Api.post(url, data);
  },

  async addMembers(data: { id: string; userIds: string[] }) {
    const url = `${baseUrl}/addMembers`;
    return Api.post(url, data);
  },

  async deleteMembers(data: { id: string; userIds: string[] }) {
    const url = `${baseUrl}/deleteMembers`;
    return Api.post(url, data);
  },

  async getMemberPageList(
    params: QueryPageListParamsType & { id: string; roleId: string },
  ) {
    const url = `${baseUrl}/getMemberPageList`;
    return Api.getPageListByQueryParams<UserResponse>(url, params);
  },

  async getRestMemberPageList(
    params: QueryPageListParamsType & { id: string; roleId: string },
  ) {
    const url = `${baseUrl}/getRestMemberPageList`;
    return Api.getPageListByQueryParams<UserResponse>(url, params);
  },
};

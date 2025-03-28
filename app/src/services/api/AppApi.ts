import type {
  AppReleaseVersionResponse,
  AppResponse,
  AppRunningResponse,
  PageRequestParams,
  RoleResponse,
} from '../responses';
import { Api } from './Api';

const baseUrl = '/app';

export const AppApi = {
  async getLatestVersion(id: string) {
    const url = `${baseUrl}/getLatestVersion`;
    return Api.get<AppReleaseVersionResponse>(url, { id });
  },

  async getPageList(params: PageRequestParams & { workspaceId: string }) {
    const url = `${baseUrl}/getPageList`;
    return Api.getPageList<AppResponse>(url, params);
  },

  async getPreviewApp(id: string) {
    const url = `${baseUrl}/getPreviewApp`;

    return Api.get<AppRunningResponse>(url, { id });
  },

  async release(data: { id: string; version: string; description: string }) {
    const url = `${baseUrl}/release`;
    return Api.post(url, data);
  },

  async create(data: { title: string; color: string; workspaceId: string }) {
    const url = `${baseUrl}/create`;
    return Api.post<AppResponse>(url, data);
  },

  async changeColor(data: { id: string; color: string }) {
    const url = `${baseUrl}/changeColor`;
    return Api.post<AppResponse>(url, data);
  },

  async changeFavicon(data: { id: string; favicon: string }) {
    const url = `${baseUrl}/changeFavicon`;
    return Api.post<AppResponse>(url, data);
  },

  async changeUrl(data: { id: string; url: string }) {
    const url = `${baseUrl}/changeUrl`;
    return Api.post<AppResponse>(url, data);
  },

  async modifyTitle(data: { id: string; title: string }) {
    const url = `${baseUrl}/modifyTitle`;
    return Api.post<AppResponse>(url, data);
  },

  async get(id: string) {
    const url = `${baseUrl}/get`;
    return Api.get<AppResponse>(url, { id });
  },

  async delete(id: string) {
    const url = `${baseUrl}/delete`;
    return Api.post(url, { id });
  },

  async restore(historyId: string) {
    const url = `${baseUrl}/restore`;
    return Api.post(url, { historyId });
  },

  async addRoles(data: { id: string; roleIds: string[] }) {
    const url = `${baseUrl}/addRoles`;
    return Api.post(url, data);
  },

  async removeRoles(data: { id: string; roleIds: string[] }) {
    const url = `${baseUrl}/removeRoles`;
    return Api.post(url, data);
  },

  async getRoles(id: string) {
    const url = `${baseUrl}/getRoles`;
    return Api.getList<RoleResponse>(url, { id });
  },

  async getUnGrantedRoles(params: { id: string; keywords: string }) {
    const url = `${baseUrl}/getUnGrantedRoles`;
    return Api.getList<RoleResponse>(url, params);
  },
};

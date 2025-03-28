import type { QueryPageListParamsType } from '@/types';
import type {
  AppReleaseInfoResponse,
  AppReleaseResponse,
  AppReleaseVersionResponse,
  AppRunningResponse,
  MyAppResponse,
} from '../responses';
import { Api } from './Api';

const baseUrl = '/appRelease';

export const AppReleaseApi = {
  async get(id: string) {
    const url = `${baseUrl}/get`;
    return Api.get<AppReleaseResponse>(url, { id });
  },

  async getPageList(params: QueryPageListParamsType) {
    const url = `${baseUrl}/getPageList`;
    return Api.getPageListByQueryParams<AppReleaseResponse>(url, params);
  },

  async getMyApps() {
    const url = `${baseUrl}/getMyApps`;
    return Api.getList<MyAppResponse>(url);
  },

  async getInfo(id: string) {
    const url = `${baseUrl}/getInfo`;

    return Api.get<AppReleaseInfoResponse>(url, { id });
  },

  async getRunningApp(id: string) {
    const url = `${baseUrl}/getRunningApp`;

    return Api.get<AppRunningResponse>(url, { id });
  },

  async getAllVersions(appId: string) {
    const url = `${baseUrl}/getAllVersions`;

    return Api.get<AppReleaseVersionResponse[]>(url, { appId });
  },

  async update(data: {
    id: string;
    logo: string;
    name: string;
    description: string;
    offlineTime: string;
  }) {
    const url = `${baseUrl}/update`;

    return Api.post(url, data);
  },

  async delete(id: string) {
    const url = `${baseUrl}/delete`;

    return Api.post(url, { id });
  },

  async rollback(id: string) {
    const url = `${baseUrl}/rollback`;

    return Api.post(url, { id });
  },
};

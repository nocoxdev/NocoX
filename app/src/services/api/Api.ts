import type { AxiosRequestConfig } from 'axios';
import type { QueryListParamsType, QueryPageListParamsType } from '@/types';
import http from '../http';
import type {
  BaseResponse,
  PageDataResponse,
  PageRequestParams,
} from '../responses';

export const Api = {
  async getPageList<TReturnData>(
    url: string,
    params?: PageRequestParams,
    config?: AxiosRequestConfig<any>,
  ) {
    const resp = await http.get<BaseResponse<PageDataResponse<TReturnData>>>(
      url,
      {
        params,
        ...config,
      },
    );
    return resp.data;
  },

  async getPageListByQueryParams<TReturnData>(
    url: string,
    params?: QueryPageListParamsType,
    config?: AxiosRequestConfig<any>,
  ) {
    const resp = await http.post<BaseResponse<PageDataResponse<TReturnData>>>(
      url,
      params,
      config,
    );
    return resp.data;
  },

  async getList<TReturnData>(
    url: string,
    params?: Record<string, any>,
    config?: AxiosRequestConfig<any>,
  ) {
    const resp = await http.get<BaseResponse<TReturnData[]>>(url, {
      params,
      ...config,
    });
    return resp.data;
  },

  async getListByQueryParams<TReturnData>(
    url: string,
    params?: QueryListParamsType,
    config?: AxiosRequestConfig<any>,
  ) {
    const resp = await http.post<BaseResponse<TReturnData[]>>(
      url,
      params,
      config,
    );
    return resp.data;
  },

  async get<TReturnData>(
    url: string,
    params?: Record<string, any>,
    config?: AxiosRequestConfig<any>,
  ) {
    const resp = await http.get<BaseResponse<TReturnData>>(url, {
      params,
      ...config,
    });
    return resp.data;
  },

  async post<TReturnData>(
    url: string,
    data: any,
    config?: AxiosRequestConfig<any>,
  ) {
    const resp = await http.post<BaseResponse<TReturnData>>(url, data, config);
    return resp.data;
  },
};

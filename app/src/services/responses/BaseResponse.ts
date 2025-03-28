export interface BaseDataResponse {
  id: string;
}

export interface BaseResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

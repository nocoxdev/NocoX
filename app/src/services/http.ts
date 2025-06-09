import axios from 'axios';
import { HOST, TOKEN_KEY } from '@/constants';
import { globalContextValue } from '@/context/GlobalContext';
import { getRedirectUrl } from '@/utils/helpers';

const http = axios.create({
  baseURL: `${HOST}/api`,
});

http.interceptors.request.use(
  (config) => {
    config.headers[TOKEN_KEY] = globalContextValue.user.token;
    config.headers['accept-language'] = `${globalContextValue.site.lang}`;

    return config;
  },
  (error) => {
    const response = { data: { success: false, message: error.message } };
    return Promise.resolve(response);
  },
);

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.log(error.response);
        globalContextValue.user.clearToken();

        globalContextValue.message.error(error.response.data.message);

        setTimeout(() => {
          window.location.href = getRedirectUrl('login');
        }, 2000);
      } else {
        const message =
          error.response.data.message ||
          error.response.data.title ||
          error.message;

        const response = {
          data: {
            success: false,
            message,
          },
        };
        return Promise.resolve(response);
      }
    } else {
      const response = {
        data: { success: false, message: error.message },
      };
      return Promise.resolve(response);
    }
  },
);

export default http;

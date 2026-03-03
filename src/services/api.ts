import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api',
  withCredentials: true,
  timeout: 10000
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;
    const config = error.config as
      | (typeof error.config & { __retried?: boolean })
      | undefined;
    if (status && status >= 500 && config && !config.__retried) {
      config.__retried = true;
      return api.request(config);
    }
    return Promise.reject(error);
  }
);

export default api;

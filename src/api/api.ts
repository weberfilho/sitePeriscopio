import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const createApiInstance = (token?: string): AxiosInstance => {
  const api = axios.create({
    baseURL: "https://x8ki-letl-twmt.n7.xano.io/api:EDKFhh3b",
  });

  api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return api;
};

export default createApiInstance;
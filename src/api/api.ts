import { useTokenStorage } from "@/storage/token";
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const createApiInstance = (): AxiosInstance => {
  const { token } = useTokenStorage();
  console.log("Token?: ", token);
  const api = axios.create({
    baseURL: "https://x8ki-letl-twmt.n7.xano.io/api:EDKFhh3b",
  });

  api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    if (!!token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return api;
};

export default createApiInstance;

import { useTokenStorage } from "@/storage/token";
import { useUserStorage } from "@/storage/user";
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const createApiInstance = (): AxiosInstance => {
  const { token } = useTokenStorage();
  const { userId } = useUserStorage();
  console.log("Token?: ", token);
  console.log("userId: ", userId);
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

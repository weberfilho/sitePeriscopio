// https://x8ki-letl-twmt.n7.xano.io/api:EDKFhh3b

import axios from "axios";

const api = axios.create({
  baseURL: "https://x8ki-letl-twmt.n7.xano.io/api:EDKFhh3b",
});

api.interceptors.request.use(async (config: any) => {
  try {
    const jsonToken = token.getString("token");
    if (jsonToken) {
      const loggedInUserAuthToken = JSON.parse(jsonToken);
      config.headers.Authorization = `Bearer ${loggedInUserAuthToken}`;
    }
  } catch (error) {
    console.error("api error =>", error);
  }

  return config;
});

export default api;

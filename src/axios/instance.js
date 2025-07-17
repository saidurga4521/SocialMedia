import axios from "axios";
import { getAuthToken } from "../helpers/Localstorage";
const base_url = "https://social-media-server-v1-awpt.onrender.com/api";
export const axiosInstance = axios.create({
  baseURL: base_url,
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

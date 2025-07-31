import { axiosInstance } from "../axios/instance";
import { Endpoints } from "./Endpoints";
export const SignUpForm = (data) => axiosInstance.post(Endpoints.sign_up, data);
export const LoginForm = (data) => axiosInstance.post(Endpoints.login, data);
export const LogOut = (token) => {
  return axiosInstance.delete(Endpoints.logout, {
    data: { token },
    withCredentials: true,
  });
};

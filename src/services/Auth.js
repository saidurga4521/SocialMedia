import { axiosInstance } from "../axios/instance";
import { Endpoints } from "./Endpoints";
export const SignUpForm = (data) => axiosInstance.post(Endpoints.sign_up, data);
export const LoginForm = (data) => axiosInstance.post(Endpoints.login, data);
export const getLoggedUser = () =>
  axiosInstance.get(Endpoints.getUserLogedData);
export const LogOut = (token) => {
  return axiosInstance.delete(Endpoints.logout, {
    data: { token },
    withCredentials: true,
  });
};
export const getAllUsers = () => axiosInstance.get(Endpoints.GetAllUsers);
export const UserFollow = (userId) =>
  axiosInstance.put(Endpoints.Followuser(userId), null);
export const UserUnFollow = (userId) =>
  axiosInstance.put(Endpoints.UnFollowuser(userId), null);
export const getAllFollowers = () =>
  axiosInstance.get(Endpoints.GetAllFollowers);
export const getAllFollowings = () =>
  axiosInstance.get(Endpoints.GetAllFollowings);

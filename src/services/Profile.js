import { axiosInstance } from "../axios/instance";
import { Endpoints } from "./Endpoints";

export const getuserInfo = () => axiosInstance.get(Endpoints.getUserLogedData);
export const UpdateProfile = (payLoad) =>
  axiosInstance.put(Endpoints.UpdateProfile, payLoad);

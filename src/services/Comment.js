import { axiosInstance } from "../axios/instance";
import { Endpoints } from "./Endpoints";
export const upLoadComment = (payLoad, postId) =>
  axiosInstance.post(Endpoints.CreateComment(postId), payLoad);
export const getCommentsByPostId = (postId) =>
  axiosInstance.get(Endpoints.GetCommentsByPostId(postId));
export const deleteComment = (commentId) =>
  axiosInstance.delete(Endpoints.DeleteComment(commentId));

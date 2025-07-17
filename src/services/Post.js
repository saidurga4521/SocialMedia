import { axiosInstance } from "../axios/instance";
import { Endpoints } from "./Endpoints";
export const uploadPost = (data) =>
  axiosInstance.post(Endpoints.postUpload, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });

export const createPost = (data) =>
  axiosInstance.post(Endpoints.postCreate, data);
export const getPosts = () => axiosInstance.get(Endpoints.GetPosts);
export const getMyPosts = () => axiosInstance.get(Endpoints.GetMyPosts);
export const deletePosts = (postId) =>
  axiosInstance.delete(Endpoints.deletePost(postId));
export const GetPostById = (postId) =>
  axiosInstance.get(Endpoints.viewPost(postId));
export const UpdatePost = (data, postId) =>
  axiosInstance.put(Endpoints.updatePost(postId), data);
export const PostLike = (postId) =>
  axiosInstance.post(Endpoints.LikePost(postId), null);
export const PostUnLike = (postId) =>
  axiosInstance.post(Endpoints.UnLikePost(postId), null);

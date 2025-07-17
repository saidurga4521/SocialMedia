import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createPost,
  deletePosts,
  PostLike,
  PostUnLike,
  UpdatePost,
} from "../src/services/Post";
const initialState = {
  posts: [],
  isLoading: false,
  error: null,
};
export const fetchPosts = createAsyncThunk("posts/getPosts", async (func) => {
  return func();
});
export const deletePostById = createAsyncThunk(
  "posts/deletePostById",
  async (id) => {
    await deletePosts(id);
    return id;
  }
);
export const updatePosts = createAsyncThunk(
  "posts/updatePosts",
  async ({ data, id }) => {
    const response = await UpdatePost(data, id);
    return response.data;
  }
);
export const createPosts = createAsyncThunk(
  "posts/createPosts",
  async (data) => {
    const response = await createPost(data);
    return response.data;
  }
);
export const postLikeById = createAsyncThunk(
  "posts/postLikeById",
  async (id) => {
    const response = await PostLike(id);
    return response.data;
  }
);
export const postDisLikeById = createAsyncThunk(
  "posts/postDisLikeById",
  async (id) => {
    const response = await PostUnLike(id);
    return response.data;
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        (state.isLoading = false), (state.posts = action.payload.data.data);
        state.error = null;
      })
      .addCase(fetchPosts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        (state.isLoading = false), (state.error = action.error.message);
      })
      .addCase(deletePostById.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      })
      .addCase(updatePosts.fulfilled, (state, action) => {
        const updatedPost = action.payload.data;
        const index = state.posts.findIndex(
          (post) => post._id === updatedPost._id
        );
        if (index !== -1) {
          state.posts[index] = updatedPost;
        }
      })
      .addCase(createPosts.fulfilled, (state, action) => {
        state.posts.push(action.payload.data);
      })
      .addCase(postLikeById.fulfilled, (state, action) => {
        const updatedPost = action.payload.data;
        const index = state.posts.findIndex(
          (post) => post._id === updatedPost._id
        );
        if (index !== -1) {
          state.posts[index] = updatedPost;
        }
      })
      .addCase(postDisLikeById.fulfilled, (state, action) => {
        const updatedPost = action.payload.data;
        const index = state.posts.findIndex(
          (post) => post._id === updatedPost._id
        );
        if (index !== -1) {
          state.posts[index] = updatedPost;
        }
      });
  },
});
export default postSlice.reducer;

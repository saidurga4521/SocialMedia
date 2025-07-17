import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteComment,
  getCommentsByPostId,
  upLoadComment,
} from "../src/services/Comment";

const initialState = {
  commentsByPostId: {},
};
export const commentsUpload = createAsyncThunk(
  "comments/commentsUpload",
  async ({ data, id }) => {
    const response = await upLoadComment(data, id);
    return response.data;
  }
);
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (id) => {
    const response = await getCommentsByPostId(id);
    return response.data;
  }
);
export const deleteComments = createAsyncThunk(
  "comments/deleteComments",
  async ({ commentId, postId }) => {
    await deleteComment(commentId);
    return { commentId, postId };
  }
);
const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.fulfilled, (state, action) => {
        const postId = action.meta.arg;
        state.commentsByPostId[postId] = action.payload.data;
      })
      .addCase(commentsUpload.fulfilled, (state, action) => {
        const comment = action.payload.data;
        const postId = comment.post;
        if (!state.commentsByPostId[postId]) {
          state.commentsByPostId[postId] = [];
        }
        state.commentsByPostId[postId].push(comment);
      })
      .addCase(deleteComments.fulfilled, (state, action) => {
        const { postId, commentId } = action.payload;
        const updatedData = state.commentsByPostId[postId].filter(
          (comment) => comment._id != commentId
        );
        state.commentsByPostId[postId] = updatedData;
      });
  },
});
export default commentSlice.reducer;

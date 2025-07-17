import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./postSlice";
import usersReducer from "./userSlice";
import commentsReducer from "./commentSlice";
export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    comments: commentsReducer,
  },
});

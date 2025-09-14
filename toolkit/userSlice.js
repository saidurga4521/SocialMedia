import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UpdateProfile } from "../src/services/Profile";
import { UserFollow } from "../src/services/Auth";

const initialState = {
  user: null,
  followStatus: "idle",
  isLoading: false,
};

export const fetchUsers = createAsyncThunk("users/userSlice", async (func) => {
  const response = await func();
  return response.data;
});

export const updateprofile = createAsyncThunk(
  "users/updateprofile",
  async (payload) => {
    const response = await UpdateProfile(payload);
    return response.data;
  }
);
export const FollowUser = createAsyncThunk(
  "users/FollowUser",
  async (userId) => {
    try {
      const response = await UserFollow(userId);
      return response?.data?.data;
    } catch (error) {
      console.log(error);
    }
  }
);
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        console.log("the users", action.payload);
        state.user = action.payload.data.user;
      })
      .addCase(updateprofile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateprofile.fulfilled, (state, action) => {
        state.user = {
          ...state.user,
          ...action.payload.data,
        };
      })
      .addCase(FollowUser.fulfilled, (state, action) => {
        state.followStatus = "success";

        console.log("followed succesfully", action.payload);
      });
  },
});

export default userSlice.reducer;

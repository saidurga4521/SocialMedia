// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { UpdateProfile } from "../src/services/Profile";

// const initialState = {
//   user: null,
// };
// export const fetchUsers = createAsyncThunk("users/userSlice", async (func) => {
//   const response = await func();
//   console.log("thunk", response);
//   return response.data;
// });
// export const updateprofile = createAsyncThunk(
//   "users/updateprofile",
//   async (payload) => {
//     const response = await UpdateProfile(payload);
//     console.log("upadate", response.data);
//     return response.data;
//   }
// );
// const userSlice = createSlice({
//   name: "users",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUsers.fulfilled, (state, action) => {
//         console.log("actionpayload1", action.payload.data.user);
//         state.user = action.payload.data.user;
//       })
//       .addCase(updateprofile.fulfilled, (state, action) => {
//         console.log("actionpayload2", action.payload.data);

//         state.user = action.payload.data;
//       });
//   },
// });
// export default userSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UpdateProfile } from "../src/services/Profile";

const initialState = {
  user: null,
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

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
      })
      .addCase(updateprofile.fulfilled, (state, action) => {
        state.user = {
          ...state.user,
          ...action.payload.data,
        };
      });
  },
});

export default userSlice.reducer;

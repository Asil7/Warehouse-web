import { createSlice } from "@reduxjs/toolkit";
import { getUsersList } from "../../actions/user/user";

const slice = createSlice({
  name: "user",
  initialState: {
    userList: [],
    isLoading: false,
  },
  reducers: {
    clearCart: (state) => {
      state.userList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsersList.fulfilled, (state, action) => {
        state.userList = action.payload.data.object;
        state.isLoading = false;
      })
      .addCase(getUsersList.rejected, (state) => {
        state.isLoading = false;
        state.userList = [];
      });
  },
});

export const { clearCart } = slice.actions;

export default slice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { login } from "../../actions/login/login";

const slice = createSlice({
  name: "login",
  initialState: {
    loginInfo: {},
    isLoading: false,
  },
  reducers: {
    clearCart: (state) => {
      state.loginInfo = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginInfo = action.payload.data;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.loginInfo = [];
      });
  },
});

export const { clearCart } = slice.actions;

export default slice.reducer;

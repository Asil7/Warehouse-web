import { createSlice } from "@reduxjs/toolkit";
import {
  getUsersList,
  getUserById,
  getUserSalary,
} from "../../actions/user/user";

const slice = createSlice({
  name: "user",
  initialState: {
    userList: [],
    userById: {},
    userSalary: {},
    isLoading: false,
    salaryLoading: false,
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
      })

      .addCase(getUserById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.userById = action.payload.data.object;
        state.isLoading = false;
      })
      .addCase(getUserById.rejected, (state) => {
        state.isLoading = false;
        state.userById = {};
      })

      .addCase(getUserSalary.pending, (state) => {
        state.salaryLoading = true;
      })
      .addCase(getUserSalary.fulfilled, (state, action) => {
        state.userSalary = action.payload.data.object;
        state.salaryLoading = false;
      })
      .addCase(getUserSalary.rejected, (state) => {
        state.salaryLoading = false;
        state.userSalary = {};
      });
  },
});

export const { clearCart } = slice.actions;

export default slice.reducer;

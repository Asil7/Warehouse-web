import { createSlice } from "@reduxjs/toolkit";
import {
  getExpenseList,
  getExpenseByUsername,
} from "../../actions/expense/expense";

const slice = createSlice({
  name: "expense",
  initialState: {
    expenseList: [],
    expenseByUsername: [],
    isLoading: false,
  },
  reducers: {
    clearCart: (state) => {
      state.expenseList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getExpenseList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExpenseList.fulfilled, (state, action) => {
        state.expenseList = action.payload.data.object;
        state.isLoading = false;
      })
      .addCase(getExpenseList.rejected, (state) => {
        state.isLoading = false;
        state.expenseList = [];
      })

      .addCase(getExpenseByUsername.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExpenseByUsername.fulfilled, (state, action) => {
        state.expenseByUsername = action.payload.data.object || [];
        state.isLoading = false;
      })
      .addCase(getExpenseByUsername.rejected, (state) => {
        state.isLoading = false;
        state.expenseByUsername = [];
      });
  },
});

export const { clearCart } = slice.actions;

export default slice.reducer;

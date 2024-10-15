import { createSlice } from "@reduxjs/toolkit";
import { getSpanList } from "../../actions/span/span";

const slice = createSlice({
  name: "span",
  initialState: {
    spanList: [],
    isLoading: false,
  },
  reducers: {
    clearCart: (state) => {
      state.spanList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSpanList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSpanList.fulfilled, (state, action) => {
        state.spanList = action.payload.data.object;
        state.isLoading = false;
      })
      .addCase(getSpanList.rejected, (state) => {
        state.isLoading = false;
        state.spanList = [];
      });
  },
});

export const { clearCart } = slice.actions;

export default slice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { getSpanList, getSpanByUsername } from "../../actions/span/span";

const slice = createSlice({
  name: "span",
  initialState: {
    spanList: [],
    spanByUsername: [],
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
      })

      .addCase(getSpanByUsername.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSpanByUsername.fulfilled, (state, action) => {
        state.spanByUsername = action.payload.data.object || [];
        state.isLoading = false;
      })
      .addCase(getSpanByUsername.rejected, (state) => {
        state.isLoading = false;
        state.spanByUsername = [];
      });
  },
});

export const { clearCart } = slice.actions;

export default slice.reducer;

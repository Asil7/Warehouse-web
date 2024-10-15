import { createSlice } from "@reduxjs/toolkit";
import { getProductList } from "../../actions/product/product";

const slice = createSlice({
  name: "product",
  initialState: {
    productList: [],
    isLoading: false,
  },
  reducers: {
    clearCart: (state) => {
      state.productList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductList.fulfilled, (state, action) => {
        state.productList = action.payload.data.object;
        state.isLoading = false;
      })
      .addCase(getProductList.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export const { clearCart } = slice.actions;

export default slice.reducer;

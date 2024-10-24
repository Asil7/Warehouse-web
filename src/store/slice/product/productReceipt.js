import { createSlice } from "@reduxjs/toolkit";
import { getReceivedProducts } from "../../actions/product/productReceipt";

const slice = createSlice({
  name: "productReceipt",
  initialState: {
    receivedProductList: [],
    isLoading: false,
  },
  reducers: {
    clearCart: (state) => {
      state.receivedProductList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReceivedProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReceivedProducts.fulfilled, (state, action) => {
        state.receivedProductList = action.payload.data.object;
        state.isLoading = false;
      })
      .addCase(getReceivedProducts.rejected, (state) => {
        state.isLoading = false;
        state.receivedProductList = [];
      });
  },
});

export const { clearCart } = slice.actions;

export default slice.reducer;

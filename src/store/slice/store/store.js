import { createSlice } from "@reduxjs/toolkit";
import { getStoreProducts } from "../../actions/store/store";

const slice = createSlice({
  name: "store",
  initialState: {
    storeProductList: [],
    isLoading: false,
  },
  reducers: {
    clearCart: (state) => {
      state.storeProductList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStoreProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStoreProducts.fulfilled, (state, action) => {
        state.storeProductList = action.payload.data.object;
        state.isLoading = false;
      })
      .addCase(getStoreProducts.rejected, (state) => {
        state.isLoading = false;
        state.storeProductList = [];
      });
  },
});

export const { clearCart } = slice.actions;

export default slice.reducer;

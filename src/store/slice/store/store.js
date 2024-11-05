import { createSlice } from "@reduxjs/toolkit";
import {
  getStoreHistoryProducts,
  getStoreProducts,
} from "../../actions/store/store";

const slice = createSlice({
  name: "store",
  initialState: {
    storeHistoryProductList: [],
    storeProductList: [],
    isLoading: false,
  },
  reducers: {
    clearCart: (state) => {
      state.storeHistoryProductList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStoreHistoryProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStoreHistoryProducts.fulfilled, (state, action) => {
        state.storeHistoryProductList = action.payload.data.object;
        state.isLoading = false;
      })
      .addCase(getStoreHistoryProducts.rejected, (state) => {
        state.isLoading = false;
        state.storeHistoryProductList = [];
      })

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

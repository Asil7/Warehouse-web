import { createSlice } from "@reduxjs/toolkit";
import { getWarehouseProducts } from "../../actions/warehouse/warehouse";

const slice = createSlice({
  name: "warehouse",
  initialState: {
    warehouseProductList: [],
    isLoading: false,
  },
  reducers: {
    clearCart: (state) => {
      state.warehouseProductList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWarehouseProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWarehouseProducts.fulfilled, (state, action) => {
        state.warehouseProductList = action.payload.data.object;
        state.isLoading = false;
      })
      .addCase(getWarehouseProducts.rejected, (state) => {
        state.isLoading = false;
        state.warehouseProductList = [];
      });
  },
});

export const { clearCart } = slice.actions;

export default slice.reducer;

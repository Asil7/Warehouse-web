import { createSlice } from "@reduxjs/toolkit";
import {
  getOrderById,
  getOrderList,
  getOrderProductList,
} from "../../actions/order/order";

const slice = createSlice({
  name: "order",
  initialState: {
    orderList: [],
    orderById: {},
    orderProductList: [],
    isLoading: false,
  },
  reducers: {
    clearCart: (state) => {
      state.orderList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderList.fulfilled, (state, action) => {
        state.orderList = action.payload.data.object;
        state.isLoading = false;
      })
      .addCase(getOrderList.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })

      .addCase(getOrderById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.orderById = action.payload.data.object;
        state.isLoading = false;
      })
      .addCase(getOrderById.rejected, (state) => {
        state.isLoading = false;
        state.orderById = {};
      })

      .addCase(getOrderProductList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderProductList.fulfilled, (state, action) => {
        state.orderProductList = action.payload.data.object;
        state.isLoading = false;
      })
      .addCase(getOrderProductList.rejected, (state) => {
        state.isLoading = false;
        state.orderProductList = [];
      });
  },
});

export const { clearCart } = slice.actions;

export default slice.reducer;

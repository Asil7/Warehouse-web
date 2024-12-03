import { createSlice } from "@reduxjs/toolkit";
import {
  createOrder,
  getOrderById,
  getOrderList,
  getOrderListByUser,
  getOrderProductList,
  getTodayOrderList,
} from "../../actions/order/order";

const slice = createSlice({
  name: "order",
  initialState: {
    orderList: [],
    orderListByUser: [],
    todayOrderList: [],
    orderById: {},
    orderProductList: [],
    isLoading: false,
    createOrderLoading: false,
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

      .addCase(getTodayOrderList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTodayOrderList.fulfilled, (state, action) => {
        state.todayOrderList = action.payload.data.object;
        state.isLoading = false;
      })
      .addCase(getTodayOrderList.rejected, (state) => {
        state.isLoading = false;
        state.todayOrderList = [];
      })

      .addCase(getOrderListByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderListByUser.fulfilled, (state, action) => {
        state.orderListByUser = action.payload.data.object;
        state.isLoading = false;
      })
      .addCase(getOrderListByUser.rejected, (state) => {
        state.isLoading = false;
        state.orderListByUser = [];
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
      })

      .addCase(createOrder.pending, (state) => {
        state.createOrderLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.createOrderLoading = false;
      })
      .addCase(createOrder.rejected, (state) => {
        state.createOrderLoading = false;
      });
  },
});

export const { clearCart } = slice.actions;

export default slice.reducer;

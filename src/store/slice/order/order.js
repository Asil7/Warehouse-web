import { createSlice } from "@reduxjs/toolkit";
import { getOrderList } from "../../actions/order/order";

const slice = createSlice({
  name: "order",
  initialState: {
    orderList: [],
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
      });
  },
});

export const { clearCart } = slice.actions;

export default slice.reducer;

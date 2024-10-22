import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";

export const getOrderList = createAsyncThunk("get/OrderList", async () => {
  try {
    const res = await api.get(`order`);
    return res;
  } catch (e) {
    return e;
  }
});

export const createOrder = createAsyncThunk("create/Order", async (data) => {
  try {
    const res = await api.post(`order`, data);
    return res;
  } catch (e) {
    return e;
  }
});

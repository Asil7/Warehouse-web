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

export const getOrderProductList = createAsyncThunk(
  "get/OrderProductList",
  async (orderId) => {
    try {
      const res = await api.get(`order/products/${orderId}`);
      return res;
    } catch (e) {
      return e;
    }
  }
);

export const getOrderById = createAsyncThunk("get/OrderById", async (id) => {
  try {
    const res = await api.get(`order/${id}`);
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

export const deleteOrder = createAsyncThunk("delete/Order", async (id) => {
  try {
    const res = await api.delete(`order/${id}`);
    return res;
  } catch (e) {
    return e;
  }
});

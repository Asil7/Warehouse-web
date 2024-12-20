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

export const getOrderListByUser = createAsyncThunk(
  "get/OrderListByUser",
  async (username) => {
    try {
      const res = await api.get(`order/user?username=${username}`);
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

export const editOrderDeliveredStatus = createAsyncThunk(
  "edit/OrderDelivered",
  async (data) => {
    try {
      const res = await api.put(
        `order/${data.id}/delivered?delivered=${data.delivered}`
      );
      return res;
    } catch (e) {
      return e;
    }
  }
);

export const getTodayOrderList = createAsyncThunk(
  "get/TodayOrderList",
  async () => {
    try {
      const res = await api.get(`order/today`);
      return res;
    } catch (e) {
      return e;
    }
  }
);

//ORDER PRODUCT

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

export const editOrderProduct = createAsyncThunk(
  "edit/OrderProduct",
  async (data) => {
    try {
      const res = await api.put(`order-product/${data.id}`, data);
      return res;
    } catch (e) {
      return e;
    }
  }
);

export const createOrderProduct = createAsyncThunk(
  "create/OrderProduct",
  async (data) => {
    try {
      const res = await api.post(`order-product/${data.orderId}`, data);
      return res;
    } catch (e) {
      return e;
    }
  }
);

export const deleteOrderProduct = createAsyncThunk(
  "delete/OrderProduct",
  async (id) => {
    try {
      const res = await api.delete(`order-product/${id}`);
      return res;
    } catch (e) {
      return e;
    }
  }
);

export const sendNotification = createAsyncThunk(
  "send/Notification",
  async (data) => {
    try {
      const res = await api.post(
        `order/send?userToken=${data.userToken}&orderId=${data.orderId}`
      );
      return res;
    } catch (e) {
      return e;
    }
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";

export const getProductList = createAsyncThunk("get/ProductList", async () => {
  try {
    const res = await api.get(`product`);
    return res;
  } catch (e) {
    return e;
  }
});

export const createProduct = createAsyncThunk(
  "create/Product",
  async (data) => {
    try {
      const res = await api.post(`product`, data);
      return res;
    } catch (e) {
      return e;
    }
  }
);

export const updateProduct = createAsyncThunk(
  "update/Product",
  async (data) => {
    try {
      const res = await api.put(`product/${data.id}`, data);
      return res;
    } catch (e) {
      return e;
    }
  }
);

export const deleteProduct = createAsyncThunk("delete/Product", async (id) => {
  try {
    const res = await api.delete(`product/${id}`);
    return res;
  } catch (e) {
    return e;
  }
});

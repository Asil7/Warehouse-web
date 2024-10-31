import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";

export const getStoreProducts = createAsyncThunk(
  "get/StoreProductList",
  async () => {
    try {
      const res = await api.get(`store`);
      return res;
    } catch (e) {
      return e;
    }
  }
);

export const createStoreProduct = createAsyncThunk(
  "create/createStoreProduct",
  async (data) => {
    try {
      const res = await api.post(`store`, data);
      return res;
    } catch (e) {
      return e;
    }
  }
);

export const editStoreProduct = createAsyncThunk(
  "edit/StoreProduct",
  async (data) => {
    try {
      const res = await api.put(`store/${data.id}`, data);
      return res;
    } catch (e) {
      return e;
    }
  }
);

export const deleteStoreProduct = createAsyncThunk(
  "delete/StoreProduct",
  async (id) => {
    try {
      const res = await api.delete(`store/${id}`);
      return res;
    } catch (e) {
      return e;
    }
  }
);

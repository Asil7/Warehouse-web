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

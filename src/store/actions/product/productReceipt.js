import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";

export const getReceivedProducts = createAsyncThunk(
  "get/ReceivedProductList",
  async () => {
    try {
      const res = await api.get(`products-receipt`);
      return res;
    } catch (e) {
      return e;
    }
  }
);

export const createProductReceipt = createAsyncThunk(
  "create/ProductReceipt",
  async (data) => {
    try {
      const res = await api.post(`products-receipt`, data);
      return res;
    } catch (e) {
      return e;
    }
  }
);

export const editReceivedProduct = createAsyncThunk(
  "edit/ReceivedProduct",
  async (data) => {
    try {
      const res = await api.put(`products-receipt/${data.id}`, data);
      return res;
    } catch (e) {
      return e;
    }
  }
);

export const deleteReceivedProduct = createAsyncThunk(
  "delete/ReceivedProduct",
  async (id) => {
    try {
      const res = await api.delete(`products-receipt/${id}`);
      return res;
    } catch (e) {
      return e;
    }
  }
);

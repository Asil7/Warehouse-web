import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";

export const getWarehouseProducts = createAsyncThunk(
  "get/WarehouseProducts",
  async () => {
    try {
      const res = await api.get(`warehouse`);
      return res;
    } catch (e) {
      return e;
    }
  }
);

export const createWarehouseProduct = createAsyncThunk(
  "create/WarehouseProduct",
  async (data) => {
    try {
      const res = await api.post(`warehouse`, data);
      return res;
    } catch (e) {
      return e;
    }
  }
);

export const updateWarehouseProduct = createAsyncThunk(
  "update/WarehouseProduct",
  async (data) => {
    try {
      const res = await api.put(`warehouse/${data.id}`, data);
      return res;
    } catch (e) {
      return e;
    }
  }
);

export const deleteWarehouseProduct = createAsyncThunk(
  "delete/WarehouseProduct",
  async (id) => {
    try {
      const res = await api.delete(`warehouse/${id}`);
      return res;
    } catch (e) {
      return e;
    }
  }
);

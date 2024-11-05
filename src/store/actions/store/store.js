import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";

//STORE HISTORY
export const getStoreHistoryProducts = createAsyncThunk(
  "get/StoreHistoryProductList",
  async () => {
    try {
      const res = await api.get(`store-history`);
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
      const res = await api.post(`store-history`, data);
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
      const res = await api.put(`store-history/${data.id}`, data);
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
      const res = await api.delete(`store-history/${id}`);
      return res;
    } catch (e) {
      return e;
    }
  }
);

export const updateStoreHistoryPaidStatus = createAsyncThunk(
  "update/StoreHistoryPaidStatus",
  async (data) => {
    try {
      const res = await api.put(
        `store-history/${data.id}/paid?paid=${data.paid}`
      );
      return res;
    } catch (e) {
      return e;
    }
  }
);

// STORE

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

export const updateStorePaidStatus = createAsyncThunk(
  "edit/StorePaidStatus",
  async (data) => {
    try {
      const res = await api.put(`store/${data.id}/paid?paid=${data.paid}`);
      return res;
    } catch (e) {
      return e;
    }
  }
);

export const updateStoreReceivedStatus = createAsyncThunk(
  "edit/StoreReceivedStatus",
  async (data) => {
    try {
      const res = await api.put(`store/${data.id}/received`, data);
      return res;
    } catch (e) {
      return e;
    }
  }
);

export const addStoreProduct = createAsyncThunk(
  "add/StoreProduct",
  async (data) => {
    try {
      const res = await api.post(`store`, data);
      return res;
    } catch (e) {
      return e;
    }
  }
);

export const updateStoreProduct = createAsyncThunk(
  "update/StoreProduct",
  async (data) => {
    try {
      const res = await api.put(`store/${data.id}`, data);
      return res;
    } catch (e) {
      return e;
    }
  }
);

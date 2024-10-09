import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";

export const getPermissionList = createAsyncThunk(
  "get/PermissionList",
  async () => {
    try {
      const res = await api.get(`permission`);
      return res;
    } catch (e) {
      return e;
    }
  }
);

export const createPermission = createAsyncThunk(
  "create/Permission",
  async (data) => {
    try {
      const res = await api.post(`permission`, data);
      return res;
    } catch (e) {
      return e;
    }
  }
);

export const updatePermission = createAsyncThunk(
  "update/Permission",
  async (data) => {
    try {
      const res = await api.put(`permission/${data.id}`, data);
      return res;
    } catch (e) {
      return e;
    }
  }
);

export const deletePermission = createAsyncThunk(
  "delete/Permission",
  async (id) => {
    try {
      const res = await api.delete(`permission/${id}`);
      return res;
    } catch (e) {
      return e;
    }
  }
);

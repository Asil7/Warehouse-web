import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";

export const getUsersList = createAsyncThunk("get/UserList", async () => {
  try {
    const res = await api.get(`user`);
    return res;
  } catch (e) {
    return e;
  }
});

export const createUser = createAsyncThunk("create/User", async (data) => {
  try {
    const res = await api.post(`user`, data);
    return res;
  } catch (e) {
    return e;
  }
});

export const deleteUser = createAsyncThunk("delete/User", async (id) => {
  try {
    const res = await api.delete(`user/${id}`);
    return res;
  } catch (e) {
    return e;
  }
});

export const updateUserStatus = createAsyncThunk(
  "update/Status",
  async (payload) => {
    try {
      const { id, status } = payload;
      const res = await api.put(`user/status/${id}/${status}`);
      return res;
    } catch (e) {
      return e;
    }
  }
);

export const updateUserPassword = createAsyncThunk(
  "update/Password",
  async (payload) => {
    try {
      const { id, password } = payload;
      const res = await api.put(`user/password/${id}`, password);
      return res;
    } catch (e) {
      return e;
    }
  }
);

export const updateUser = createAsyncThunk("update/User", async (data) => {
  try {
    const res = await api.put(`user/${data.id}`, data);
    return res;
  } catch (e) {
    return e;
  }
});

export const getUserById = createAsyncThunk("get/UserById", async (id) => {
  try {
    const res = await api.get(`user/${id}`);
    return res;
  } catch (e) {
    return e;
  }
});

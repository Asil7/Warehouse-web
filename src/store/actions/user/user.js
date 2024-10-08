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

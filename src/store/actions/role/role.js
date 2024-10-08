import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";

export const getRoleList = createAsyncThunk("get/RoleList", async () => {
  try {
    const res = await api.get(`role`);
    return res;
  } catch (e) {
    return e;
  }
});

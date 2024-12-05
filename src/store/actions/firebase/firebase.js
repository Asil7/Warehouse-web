import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";

export const sendNotification = createAsyncThunk(
  "send/Notification",
  async (data) => {
    try {
      const res = await api.post(`firebase/send`, data);
      return res;
    } catch (e) {
      return e;
    }
  }
);

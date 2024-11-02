import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../../api";
// import { httpErrorHandler, isSuccess } from "utils/HttpUtil";

export const login = createAsyncThunk("login", async (data) => {
  try {
    const res = await axios.post(
      `https://192.168.1.62:8080/api/auth/login`,
      data
    ); //`https://192.168.7.48:8080/api/auth/login`,
    return res;
  } catch (e) {
    return e;
  }
});

export const getUsers = createAsyncThunk("getUsers", async (data) => {
  try {
    const res = await api.get(`user`, data);
    return res;
  } catch (e) {
    return e;
  }
});

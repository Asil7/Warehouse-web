import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import api from 'api';
// import { httpErrorHandler, isSuccess } from "utils/HttpUtil";

export const login = createAsyncThunk("login", async (data) => {
  try {
    const res = await axios.post(`http://localhost:8080/api/auth/login`, data);
    return res;
  } catch (e) {
    return e;
  }
});

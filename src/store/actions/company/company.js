import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";

export const getCompanyList = createAsyncThunk("get/CompanyList", async () => {
  try {
    const res = await api.get(`company`);
    return res;
  } catch (e) {
    return e;
  }
});

export const getCompanyById = createAsyncThunk(
  "get/CompanyById",
  async (id) => {
    try {
      const res = await api.get(`company/${id}`);
      return res;
    } catch (e) {
      return e;
    }
  }
);

export const createCompany = createAsyncThunk(
  "create/Company",
  async (data) => {
    try {
      const res = await api.post(`company`, data);
      return res;
    } catch (e) {
      return e;
    }
  }
);

export const updateCompany = createAsyncThunk(
  "update/Company",
  async (data) => {
    try {
      const res = await api.put(`company/${data.id}`, data);
      return res;
    } catch (e) {
      return e;
    }
  }
);

export const deleteCompany = createAsyncThunk("delete/Company", async (id) => {
  try {
    const res = await api.delete(`company/${id}`);
    return res;
  } catch (e) {
    return e;
  }
});

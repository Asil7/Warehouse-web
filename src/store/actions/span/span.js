import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";

export const getSpanList = createAsyncThunk("get/SpanList", async () => {
  try {
    const res = await api.get(`span`);
    return res;
  } catch (e) {
    return e;
  }
});

export const createSpan = createAsyncThunk("create/Span", async (data) => {
  try {
    const res = await api.post(`span`, data);
    return res;
  } catch (e) {
    return e;
  }
});

export const updateSpan = createAsyncThunk("update/Span", async (data) => {
  try {
    const res = await api.put(`span/${data.id}`, data);
    return res;
  } catch (e) {
    return e;
  }
});

export const deleteSpan = createAsyncThunk("delete/pan", async (id) => {
  try {
    const res = await api.delete(`span/${id}`);
    return res;
  } catch (e) {
    return e;
  }
});

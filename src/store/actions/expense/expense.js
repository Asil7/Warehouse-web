import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";

export const getExpenseList = createAsyncThunk("get/ExpenseList", async () => {
  try {
    const res = await api.get(`expense`);
    return res;
  } catch (e) {
    return e;
  }
});

export const getExpenseByUsername = createAsyncThunk(
  "get/ExpenseByUsername",
  async (username) => {
    try {
      const res = await api.get(`expense/${username}`);
      console.log(res);
      return res;
    } catch (e) {
      return e;
    }
  }
);

export const createExpense = createAsyncThunk(
  "create/Expense",
  async (data) => {
    try {
      const res = await api.post(`expense`, data);
      return res;
    } catch (e) {
      return e;
    }
  }
);

export const updateExpense = createAsyncThunk(
  "update/Expense",
  async (data) => {
    try {
      const res = await api.put(`expense/${data.id}`, data);
      return res;
    } catch (e) {
      return e;
    }
  }
);

export const deleteExpense = createAsyncThunk("delete/Expense", async (id) => {
  try {
    const res = await api.delete(`expense/${id}`);
    return res;
  } catch (e) {
    return e;
  }
});

import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCKvdHGuLjO6FZsd4nVEffKm-yIHnL2uew",
  authDomain: "warehouse-14660.firebaseapp.com",
  projectId: "warehouse-14660",
  storageBucket: "warehouse-14660.firebasestorage.app",
  messagingSenderId: "528147989378",
  appId: "1:528147989378:web:8e3445d9366b733fdfc59b",
  measurementId: "G-674958JBV7",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

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

export const getUserSalary = createAsyncThunk(
  "get/UserSalary",
  async (data) => {
    try {
      const res = await api.get(
        `user/${data.userId}/calculate-salary?givenDate=${data.givenDate}`
      );
      return res;
    } catch (e) {
      return e;
    }
  }
);

export const giveSalary = createAsyncThunk("get/GiveSalary", async (data) => {
  try {
    const res = await api.post(
      `user/give-salary?username=${data.username}&salary=${data.salary}&givenSalary=${data.givenSalary}`
    );
    return res;
  } catch (e) {
    return e;
  }
});

export const updateFireBaseToken = createAsyncThunk(
  "update/FireBaseToken",
  async (username) => {
    try {
      const token = await getToken(messaging, {
        vapidKey:
          "BIGJrmR1psYeZMjHze_HxAmMLtAHsO08IEYcSma1Wi0vEJsRb3rsEuckMb4-NZXr34FMIGkDuLsV5Dmpk93inZM",
      });
      const payload = {
        username: username,
        firebaseToken: token,
      };
      const res = await api.post(`user/update-firebase-token`, payload);
      return res;
    } catch (e) {
      return e;
    }
  }
);

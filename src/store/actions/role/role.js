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

export const getRoleById = createAsyncThunk("get/RoleById", async (roleId) => {
  try {
    const res = await api.get(`role/${roleId}`);
    return res;
  } catch (e) {
    return e;
  }
});

export const getRolePermissions = createAsyncThunk(
  "get/RolePermission",
  async (roleId) => {
    try {
      const res = await api.get(`role/${roleId}/permissions`);
      return res;
    } catch (e) {
      return e;
    }
  }
);

export const getRoleNotHavePermissions = createAsyncThunk(
  "get/RoleNotPermissions",
  async (roleId) => {
    try {
      const res = await api.get(`role/${roleId}/notPermissions`);
      return res;
    } catch (e) {
      return e;
    }
  }
);

export const createRole = createAsyncThunk("create/Role", async (data) => {
  try {
    const res = await api.post(`role`, data);
    return res;
  } catch (e) {
    return e;
  }
});

export const updateRole = createAsyncThunk("update/Role", async (data) => {
  try {
    const res = await api.put(`role/${data.id}`, data);
    return res;
  } catch (e) {
    return e;
  }
});

export const deleteRole = createAsyncThunk("delete/Role", async (roleId) => {
  try {
    const res = await api.delete(`role/${roleId}`);
    return res;
  } catch (e) {
    return e;
  }
});

export const addPermissionToRole = createAsyncThunk(
  "add/PermissionToRole",
  async (data) => {
    try {
      const { roleId, permissionId } = data;
      const res = await api.put(`role/addPermission/${roleId}/${permissionId}`);
      return res;
    } catch (e) {
      return e;
    }
  }
);

export const deletePermissionFromRole = createAsyncThunk(
  "delete/PermissionFromRole",
  async (data) => {
    try {
      const { roleId, permissionId } = data;
      const res = await api.put(
        `role/deletePermission/${roleId}/${permissionId}`
      );
      return res;
    } catch (e) {
      return e;
    }
  }
);

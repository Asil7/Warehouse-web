import { createSlice } from "@reduxjs/toolkit";
import {
  getRoleList,
  getRoleById,
  getRolePermissions,
  getRoleNotHavePermissions,
} from "../../actions/role/role";

const slice = createSlice({
  name: "role",
  initialState: {
    roleList: [],
    roleById: {},
    rolePermission: [],
    roleNotPermission: [],
    isLoading: false,
  },
  reducers: {
    clearCart: (state) => {
      state.roleList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRoleList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRoleList.fulfilled, (state, action) => {
        state.roleList = action.payload.data.object;
        state.isLoading = false;
      })
      .addCase(getRoleList.rejected, (state) => {
        state.isLoading = false;
        state.roleList = [];
      })

      .addCase(getRoleById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRoleById.fulfilled, (state, action) => {
        state.roleById = action.payload.data.object;
        state.isLoading = false;
      })
      .addCase(getRoleById.rejected, (state) => {
        state.isLoading = false;
        state.roleById = [];
      })

      .addCase(getRolePermissions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRolePermissions.fulfilled, (state, action) => {
        state.rolePermission = action.payload.data.object;
        state.isLoading = false;
      })
      .addCase(getRolePermissions.rejected, (state) => {
        state.isLoading = false;
        state.rolePermission = [];
      })

      .addCase(getRoleNotHavePermissions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRoleNotHavePermissions.fulfilled, (state, action) => {
        state.roleNotPermission = action.payload.data.object;
        state.isLoading = false;
      })
      .addCase(getRoleNotHavePermissions.rejected, (state) => {
        state.isLoading = false;
        state.roleNotPermission = [];
      });
  },
});

export const { clearCart } = slice.actions;

export default slice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { getPermissionList } from "../../actions/permission/permission";

const slice = createSlice({
  name: "permission",
  initialState: {
    permissionList: [],
    isLoading: false,
  },
  reducers: {
    clearCart: (state) => {
      state.permissionList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPermissionList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPermissionList.fulfilled, (state, action) => {
        state.permissionList = action.payload.data.object;
        state.isLoading = false;
      })
      .addCase(getPermissionList.rejected, (state) => {
        state.isLoading = false;
        state.permissionList = [];
      });
  },
});

export const { clearCart } = slice.actions;

export default slice.reducer;

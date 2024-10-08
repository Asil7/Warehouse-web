import { createSlice } from "@reduxjs/toolkit";
import { getRoleList } from "../../actions/role/role";

const slice = createSlice({
  name: "role",
  initialState: {
    roleList: [],
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
      });
  },
});

export const { clearCart } = slice.actions;

export default slice.reducer;

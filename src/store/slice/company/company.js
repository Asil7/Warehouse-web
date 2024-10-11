import { createSlice } from "@reduxjs/toolkit";
import { getCompanyById, getCompanyList } from "../../actions/company/company";

const slice = createSlice({
  name: "company",
  initialState: {
    companyList: [],
    companyById: {},
    isLoading: false,
  },
  reducers: {
    clearCart: (state) => {
      state.companyList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCompanyList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCompanyList.fulfilled, (state, action) => {
        state.companyList = action.payload.data.object;
        state.isLoading = false;
      })
      .addCase(getCompanyList.rejected, (state) => {
        state.isLoading = false;
        state.companyList = [];
      })

      .addCase(getCompanyById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCompanyById.fulfilled, (state, action) => {
        state.companyById = action.payload.data.object;
        state.isLoading = false;
      })
      .addCase(getCompanyById.rejected, (state) => {
        state.isLoading = false;
        state.companyById = [];
      });
  },
});

export const { clearCart } = slice.actions;

export default slice.reducer;

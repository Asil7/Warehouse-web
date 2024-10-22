import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import login from "./slice/login/login";
import auth from "./slice/auth/authSlice";
import user from "./slice/user/user";
import role from "./slice/role/role";
import permission from "./slice/permission/permission";
import company from "./slice/company/company";
import product from "./slice/product/product";
import expense from "./slice/expense/expense";
import warehouse from "./slice/warehouse/warehouse";
import order from "./slice/order/order";

export const throwMiddleware = () => (next) => (action) => {
  next(action);
  if (action?.error) throw action.error;
};

const reducer = combineReducers({
  login,
  auth,
  user,
  role,
  permission,
  company,
  product,
  expense,
  warehouse,
  order,
});

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(throwMiddleware),
});

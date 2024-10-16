import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import login from "./slice/login/login";
import auth from "./slice/auth/authSlice";
import user from "./slice/user/user";
import role from "./slice/role/role";
import permission from "./slice/permission/permission";
import company from "./slice/company/company";
import product from "./slice/product/product";
import span from "./slice/span/span";
import warehouse from "./slice/warehouse/warehouse";

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
  span,
  warehouse,
});

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(throwMiddleware),
});

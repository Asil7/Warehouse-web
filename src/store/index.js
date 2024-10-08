import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import login from "./slice/login/login";
import auth from "./slice/auth/authSlice";

export const throwMiddleware = () => (next) => (action) => {
  next(action);
  if (action?.error) throw action.error;
};

const reducer = combineReducers({
  login,
  auth,
});

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(throwMiddleware),
});

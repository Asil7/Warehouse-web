import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/login/Login";
import TheLayout from "./containers/TheLayout";
import UserList from "./pages/user/UserList";
import ErrorBoundary from "./containers/ErrorBoundary";
import RoleList from "./pages/security/role/RoleList";
import "bootstrap-icons/font/bootstrap-icons.css";
import UserForm from "./pages/user/UserForm";
import PermissionList from "./pages/security/permission/PermissionList";
import "./App.css";

const PrivateRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <ErrorBoundary>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />

        <Route
          path="/"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <TheLayout />
            </PrivateRoute>
          }
        >
          {/* USER */}
          <Route
            path="users"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <UserList />
              </PrivateRoute>
            }
          />
          <Route
            path="user-form"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <UserForm />
              </PrivateRoute>
            }
          />
          <Route
            path="user-form/:id"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <UserForm />
              </PrivateRoute>
            }
          />
          {/* ROLE */}
          <Route
            path="roles"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <RoleList />
              </PrivateRoute>
            }
          />
          {/* PERMISSION */}
          <Route
            path="permission-list"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <PermissionList />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
};

export default App;

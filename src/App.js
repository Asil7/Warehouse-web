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
import RoleForm from "./pages/security/role/RoleForm";
import RolePermissionForm from "./pages/security/role/RolePermissionForm";
import CompanyList from "./pages/company/CompanyList";
import CompanyForm from "./pages/company/CompanyForm";
import Profile from "./containers/Profile";
import ProductList from "./pages/product/ProductList";
import Span from "./pages/span/Span";

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
          <Route
            path="role-form"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <RoleForm />
              </PrivateRoute>
            }
          />
          <Route
            path="role-form/:id"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <RoleForm />
              </PrivateRoute>
            }
          />
          <Route
            path="role-permission/:id"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <RolePermissionForm />
              </PrivateRoute>
            }
          />
          {/* PERMISSION */}
          <Route
            path="permissions"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <PermissionList />
              </PrivateRoute>
            }
          />
          {/*COMPANY*/}
          <Route
            path="companies"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <CompanyList />
              </PrivateRoute>
            }
          />
          <Route
            path="company-form"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <CompanyForm />
              </PrivateRoute>
            }
          />
          <Route
            path="company-form/:id"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <CompanyForm />
              </PrivateRoute>
            }
          />
          {/*Profile*/}
          <Route
            path="profile"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Profile />
              </PrivateRoute>
            }
          />
          {/*Product*/}
          <Route
            path="products"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <ProductList />
              </PrivateRoute>
            }
          />
          {/*SPAN*/}
          <Route
            path="span"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Span />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
};

export default App;

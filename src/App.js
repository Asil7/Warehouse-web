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
import Expense from "./pages/expense/Expense";
import WarehouseProducts from "./pages/warehouse/WarehouseProducts";
import UserExpense from "./pages/user/UserExpense";
import OrderList from "./pages/order/OrderList";
import OrderForm from "./pages/order/OrderForm";
import ProductReceipt from "./pages/warehouse/ProductReceipt";
import OrderProductList from "./pages/order/OrderProductList";
import Store from "./pages/warehouse/Store";

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
          {/*ORDER*/}
          <Route
            path="orders"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <OrderList />
              </PrivateRoute>
            }
            name="Orders"
          />
          <Route
            path="orders/order-form"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <OrderForm />
              </PrivateRoute>
            }
            name="Add Order"
          />
          <Route
            path="orders/order-product-list/:id"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <OrderProductList />
              </PrivateRoute>
            }
            name="Order product list"
          />
          {/* USER */}
          <Route
            path="users"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <UserList />
              </PrivateRoute>
            }
            name="Users"
          />
          <Route
            path="users/user-form"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <UserForm />
              </PrivateRoute>
            }
            name="Create User"
          />
          <Route
            path="users/user-form/:id"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <UserForm />
              </PrivateRoute>
            }
            name="Edit User"
          />
          {/* ROLE */}
          <Route
            path="roles"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <RoleList />
              </PrivateRoute>
            }
            name="Roles"
          />
          <Route
            path="role-form"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <RoleForm />
              </PrivateRoute>
            }
            name="Create Role"
          />
          <Route
            path="role-form/:id"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <RoleForm />
              </PrivateRoute>
            }
            name="Edit Role"
          />
          <Route
            path="role-permission/:id"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <RolePermissionForm />
              </PrivateRoute>
            }
            name="Role Permissions"
          />
          {/* PERMISSION */}
          <Route
            path="permissions"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <PermissionList />
              </PrivateRoute>
            }
            name="Permissions"
          />
          {/*COMPANY*/}
          <Route
            path="companies"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <CompanyList />
              </PrivateRoute>
            }
            name="Companies"
          />
          <Route
            path="companies/company-form"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <CompanyForm />
              </PrivateRoute>
            }
            name="Create Company"
          />
          <Route
            path="companies/company-form/:id"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <CompanyForm />
              </PrivateRoute>
            }
            name="Edit Company"
          />
          {/*Profile*/}
          <Route
            path="profile"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Profile />
              </PrivateRoute>
            }
            name="Profile"
          />
          {/*Product*/}
          <Route
            path="products"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <ProductList />
              </PrivateRoute>
            }
            name="Products"
          />
          {/*EXPENSE*/}
          <Route
            path="expense"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Expense />
              </PrivateRoute>
            }
            name="Expense"
          />
          <Route
            path="users/user-expense/:username"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <UserExpense />
              </PrivateRoute>
            }
            name="Expense"
          />
          {/*Warehouse*/}
          <Route
            path="warehouse-products"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <WarehouseProducts />
              </PrivateRoute>
            }
            name="Warehouse Products"
          />
          <Route
            path="received-products"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <ProductReceipt />
              </PrivateRoute>
            }
            name="Received Products"
          />
          <Route
            path="store"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Store />
              </PrivateRoute>
            }
            name="Store"
          />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
};

export default App;

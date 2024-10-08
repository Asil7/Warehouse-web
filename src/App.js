import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/login/Login";
import TheLayout from "./containers/TheLayout";
import UserList from "./pages/user/UserList"; // Import the UserList component
import ErrorBoundary from "./containers/ErrorBoundary";
import RoleList from "./pages/security/role/RoleList";

const PrivateRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <ErrorBoundary>
      <Routes>
        {/* Public Route */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />

        {/* Protected Route with layout */}
        <Route
          path="/"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <TheLayout />
            </PrivateRoute>
          }
        >
          {/* Route for User List inside TheLayout */}
          <Route
            path="users" // Nested route
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <UserList />
              </PrivateRoute>
            }
          />
          <Route
            path="roles" // Nested route
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <RoleList />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
};

export default App;

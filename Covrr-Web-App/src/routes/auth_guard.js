import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import PrivateRoute from "./private_route";

const AuthGuard = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const roles = useSelector((state) => state.auth.roles);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Future role-based access logic can be added here
  // if (roles && !roles.includes(userRole)) {
  //   return <Navigate to="/unauthorized" />;
  // }

  return <PrivateRoute roles={roles} />;
};

export default AuthGuard;

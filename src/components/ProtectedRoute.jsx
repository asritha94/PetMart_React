import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";

export function ProtectedRoute({ children, adminOnly = false }) {
  const { currentUser, adminSession } = useApp();
  const location = useLocation();
  const activeUser = adminOnly ? adminSession : currentUser;

  if (!activeUser) {
    // If attempting to access an admin route, redirect to admin login
    if (adminOnly) {
      return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }
    // Normal protected customer route (checkout, profile, orders)
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && adminSession?.role !== "admin") {
    // Authenticated, but not an admin
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;

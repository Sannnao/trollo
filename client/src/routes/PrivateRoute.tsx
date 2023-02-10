import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { LOGIN_ROUTE } from "../constants/routes/authRoutes";
import { useAuth } from "../hooks/useAuth";

type PrivateRouteProps = {
  children?: React.ReactElement | React.ReactElement[];
};

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuth } = useAuth();
  const location = useLocation();

  return isAuth ? (
    <>{children}</>
  ) : (
    <Navigate to={LOGIN_ROUTE} state={{ from: location.pathname }} />
  );
};

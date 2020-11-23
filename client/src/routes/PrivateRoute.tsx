import React from 'react';
import { RouteProps } from 'react-router';
import { Route, Navigate, useLocation } from 'react-router-dom';
import { LOGIN_ROUTE } from '../constants/routes/authRoutes';
import { useAuth } from '../hooks/useAuth';

type PrivateRouteProps = {
  element: React.ReactElement,
  children?: React.ReactElement | React.ReactElement[],
}

export const PrivateRoute = ({ children, ...props }: PrivateRouteProps & RouteProps) => {
  const { isAuth } = useAuth();
  const location = useLocation();

  return (
    isAuth
      ? <Route
        {...props}
      >
        {children}
      </Route>
      : <Navigate
        to={LOGIN_ROUTE}
        state={{from: location.pathname}}
      />
  );
}

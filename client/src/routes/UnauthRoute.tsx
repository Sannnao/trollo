import React from 'react';
import { RouteProps } from 'react-router';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

type UnauthRouteProps = {
  element: React.ReactElement,
  children?: React.ReactElement | React.ReactElement[],
}

export const UnauthRoute = ({ children, ...props }: UnauthRouteProps & RouteProps) => {
  const { isAuth } = useAuth();

  console.log(children)
  return (
    !isAuth
      ? <Route
        {...props}
      >
        {children}
      </Route>
      : <Navigate
        to='/main'
      />
  );
}

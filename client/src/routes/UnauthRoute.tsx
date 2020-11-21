import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

type UnauthRouteProps = {
  children: React.ReactElement,
}

export const UnauthRoute: React.FC<UnauthRouteProps & RouteProps> = ({ children, ...props }) => {
  const { isAuth } = useAuth();

  return (
    !isAuth
      ? <Route
        {...props}
      >
        {children}
      </Route>
      : <Redirect
        to='/'
      />
  );
}

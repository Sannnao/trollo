import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

type PrivateRouteProps = {
  children: React.ReactElement,
}

export const PrivateRoute: React.FC<PrivateRouteProps & RouteProps> = ({ children, ...props }) => {
  const { isAuth } = useAuth();

  return (
    <Route
      {...props}
    >
      {({ location }) =>
        isAuth
        ? children
        : <Redirect
          to={{
            pathname: "/welcome/login",
            state: { from: location }
          }}
        />
      }
    </Route>
  );
}

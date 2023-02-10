import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

type UnauthRouteProps = {
  children?: React.ReactElement | React.ReactElement[];
};

export const UnauthRoute = ({ children }: UnauthRouteProps) => {
  const { isAuth } = useAuth();

  return !isAuth ? (
    <>{children}</>
  ) : (
    <>
      <Navigate to="/main" />
    </>
  );
};

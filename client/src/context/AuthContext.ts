import React from 'react';

export interface AuthContextShape {
  isAuth: boolean
  setIsAuth: (isAuth: boolean) => void
  authUserId: null | number
  setAuthUserId(authUserId: null | number): void
}

export const AuthContext = React.createContext<AuthContextShape>({
  isAuth: false,
  setIsAuth() {},
  authUserId: null,
  setAuthUserId() {},
})

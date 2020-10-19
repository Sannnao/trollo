import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { UserInfo } from './components/UserInfo/UserInfo';
import { MainPage, AuthPage, LoginPage, LogoutPage, WelcomePage, RegisterPage } from './pages';

export const useRoutes = (isAuthenticated: boolean) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/main">
          <MainPage />
        </Route>
        <Route path="/user-info">
          <UserInfo />
        </Route>
        <Route path="/logout">
          <LogoutPage />
        </Route>
        <Redirect to="/main" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/" exact>
        <WelcomePage />
      </Route>
      <Route path="/auth">
        <AuthPage />
      </Route>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/register">
        <RegisterPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}

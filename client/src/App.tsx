import React, { useEffect, useState, useMemo } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { JwtTokenShape } from './interfaces';
import { AuthContext, AuthContextShape } from './context/AuthContext';
import { MainPage, LogoutPage, WelcomePage } from './pages';
import { PrivateRoute } from './routes/PrivateRoute';
import { UnauthRoute } from './routes/UnauthRoute';
import { Header, UserInfo } from '../src/components';

import './App.css';

function App() {
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [authUserId, setAuthUserId] = useState<null | number>(null);

  useEffect(() => {
    const jwtToken = localStorage.getItem('JWTAuthTraining');

    if (jwtToken) {
      const date = Date.now();
      const decoded: JwtTokenShape = jwt_decode(jwtToken);
      const expDate: number = decoded.exp * 1000;

      if (date < expDate) {
        setIsAuth(true);
        setAuthUserId(decoded._id);
      }
    }

    setIsAuthChecked(true);
  }, []);

  const authContextData: AuthContextShape = {
    isAuth,
    setIsAuth,
    authUserId,
    setAuthUserId,
  }

  return isAuthChecked ? (
    <AuthContext.Provider value={authContextData}>
      <Router>
        <Header />
        <main className="main">
          <Switch>
            <PrivateRoute path="/" exact>
              <MainPage />
            </PrivateRoute>
            <PrivateRoute path="/user-info">
              <UserInfo />
            </PrivateRoute>
            <PrivateRoute path="/logout">
              <LogoutPage />
            </PrivateRoute>
            <UnauthRoute path="/welcome">
              <WelcomePage />
            </UnauthRoute>
          </Switch>
        </main>
      </Router>
    </AuthContext.Provider>
  ) : null;
}

export default App;

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
import { useRoutes } from './routes';
import { AuthContext, AuthContextShape } from './context/AuthContext';

import { Header } from '../src/components';

import './App.css';



function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [authUserId, setAuthUserId] = useState<null | number>(null);
  const routes = useRoutes(isAuth);

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
  }, []);

  const authContextData: AuthContextShape = {
    isAuth,
    setIsAuth,
    authUserId,
    setAuthUserId,
  }

  return (
    <AuthContext.Provider value={authContextData}>
      <Router>
        <Header />
        <main className="main">
          {routes}
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;

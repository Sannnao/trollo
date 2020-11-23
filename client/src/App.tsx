import React, { useState } from 'react';
import {
  Route,
  Routes,
} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { JwtTokenShape } from './interfaces';
import { AuthContext, AuthContextShape } from './context/AuthContext';
import { MainPage, LogoutPage, WelcomePage } from './pages';
import { PrivateRoute } from './routes/PrivateRoute';
import { UnauthRoute } from './routes/UnauthRoute';
import { UserInfo, Login, Register, TasksBoard } from '../src/components';
import { LOGIN_ROUTE, REGISTER_ROUTE } from './constants/routes/authRoutes';

import './App.css';

function App() {
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [authUserId, setAuthUserId] = useState<null | number>(null);

  const checkIsAuth = () => {
    const jwtToken = localStorage.getItem('JWTAuthTraining');

    if (jwtToken) {
      const date = Date.now();
      const decoded: JwtTokenShape = jwt_decode(jwtToken);
      const expDate: number = decoded.exp * 1000;

      if (date < expDate) {
        setIsAuth(true);
        setAuthUserId(decoded._id);
        setIsAuthChecked(true);
      }
    }
  }

  if (!isAuthChecked) {
    checkIsAuth();
  }

  const authContextData: AuthContextShape = {
    isAuth,
    setIsAuth,
    authUserId,
    setAuthUserId,
  }

  return (
    <AuthContext.Provider value={authContextData}>
      <Routes>
        <UnauthRoute path="/" element={<WelcomePage />}>
          <Route path={LOGIN_ROUTE} element={<Login />} />
          <Route path={REGISTER_ROUTE} element={<Register />} />
        </UnauthRoute>
        <PrivateRoute path="/main" element={<MainPage />}>
          <Route path='tasks-board' element={<TasksBoard />}/>
          <Route path='user-info' element={<UserInfo />}/>
          <Route path='logout' element={<LogoutPage />} />
        </PrivateRoute>
      </Routes>
    </AuthContext.Provider >
  );
}

export default App;

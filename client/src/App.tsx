import React, { useLayoutEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
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
  const [isAuth, setIsAuth] = useState(false);
  const [authUserId, setAuthUserId] = useState<null | number>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkIsAuth = async () => {
    setIsLoading(true);
    const jwtToken = localStorage.getItem('JWTAuthTraining');

    if (jwtToken) {
      const date = Date.now();
      const decoded: JwtTokenShape = jwt_decode(jwtToken);
      const expDate: number = decoded.exp * 1000;

      if (date < expDate) {
        const res = await fetch('/users/me', {
          headers: {
            'Content-type': 'application/json,charset=utf-8;',
            Authorization: `Bearer ${JSON.parse(jwtToken)}`,
          },
        });

        if (res.ok) {
          const user = await res.json();

          setIsAuth(true);
          setAuthUserId(user.user_id);
        } else {
          setIsAuth(false);
        }
      }
    }
    setIsLoading(false);
  };

  useLayoutEffect(() => {
    checkIsAuth();
  }, []);

  if (isLoading) return <div>Loading</div>;

  const authContextData: AuthContextShape = {
    isAuth,
    setIsAuth,
    authUserId,
    setAuthUserId,
  };

  return (
    <AuthContext.Provider value={authContextData}>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <UnauthRoute>
                <WelcomePage />
              </UnauthRoute>
            }
          >
            <Route path={LOGIN_ROUTE} element={<Login />} />
            <Route path={REGISTER_ROUTE} element={<Register />} />
          </Route>
          <Route
            path="/main"
            element={
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
            }
          >
            <Route path="tasks-board" element={<TasksBoard />} />
            <Route path="user-info" element={<UserInfo />} />
            <Route path="logout" element={<LogoutPage />} />
          </Route>
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;

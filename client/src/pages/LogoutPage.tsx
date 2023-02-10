import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const LogoutPage = () => {
  const { setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    const token: string | null = localStorage.getItem(`JWTAuthTraining`);
    console.log(token);

    if (token) {
      fetch('/users/me/logout', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json,charset=utf-8;',
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      }).then((res) => {
        if (res.status) {
          localStorage.removeItem(`JWTAuthTraining`);
          setIsAuth(false);
          navigate('/', { replace: true });
        }
      });
    }
  };

  const handleLogoutAll = () => {
    const token: string | null = localStorage.getItem(`JWTAuthTraining`);

    if (token) {
      fetch('/users/me/logoutall', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json,charset=utf-8;',
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      }).then((res) => {
        if (res.status) {
          localStorage.removeItem(`JWTAuthTraining`);
          setIsAuth(false);
          navigate('/login', { replace: true });
        }
      });
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '40%',
        marginTop: '20px',
      }}
    >
      <button
        style={{ marginRight: 15 }}
        className="waves-effect waves-light btn"
        onClick={handleLogout}
      >
        Logout
      </button>
      <button
        className="waves-effect waves-light btn"
        onClick={handleLogoutAll}
      >
        Logout All Devices
      </button>
    </div>
  );
};

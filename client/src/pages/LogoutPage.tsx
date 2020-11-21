import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const LogoutPage = () => {
  const { setIsAuth } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    const token: string | null = localStorage.getItem(`JWTAuthTraining`);

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
          history.replace('/');
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
          history.replace('/');
        }
      });
    }
  };

  return (
    <div style={{ display: 'flex', width: '40%', }}>
      <button style={{ marginRight: 15 }} className='waves-effect waves-light btn' onClick={handleLogout}>Logout</button>
      <button className='waves-effect waves-light btn' onClick={handleLogoutAll}>Logout All Devices</button>
    </div>
  );
}

import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const LogoutPage = () => {
  const { setIsAuth } = useContext(AuthContext);

  const handleLogout = () => {
    const token: string | null = localStorage.getItem(`JWTAuthTraining`);

    if (token) {

      fetch('http://localhost:3000/users/me/logout', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json,charset=utf-8;',
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      }).then((res) => {
        if (res.status) {
          localStorage.removeItem(`JWTAuthTraining`);
          setIsAuth(false);
        }
      });
    }
  };

  const handleLogoutAll = () => {
    const token: string | null = localStorage.getItem(`JWTAuthTraining`);

    if (token) {
      fetch('http://localhost:3000/users/me/logoutall', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json,charset=utf-8;',
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      }).then((res) => {
        if (res.status) {
          localStorage.removeItem(`JWTAuthTraining`);
          setIsAuth(false);
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

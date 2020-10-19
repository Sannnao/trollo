import React, { useState, useEffect } from 'react';

export const UserInfo = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const jwtToken = localStorage.getItem('JWTAuthTraining');

    if (jwtToken) {
      fetch('http://localhost:3000/users/me', {
        headers: {
          'Content-type': 'application/json,charset=utf-8;',
          Authorization: `Bearer ${JSON.parse(jwtToken)}`,
        },
      })
        .then(res => res.json())
        .then(res => {
          const { email, name } = res;

          setEmail(email);
          setName(name);
        });
    }

  }, []);

  return (
    <div>
      <h2>About mee</h2>
      {name && email
        && <ul>
          <li>email: {email}</li>
          <li>name: {name}</li>
        </ul>
      }
    </div>
  );
};

import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Input } from '../components';
import { AuthContext } from '../context/AuthContext';

export const LoginPage = () => {
  const history = useHistory();
  const { setIsAuth, setAuthUserId } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    fetch('http://localhost:3000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();

        throw new Error(res.statusText);
      })
      .then((res) => {
        localStorage.setItem(`JWTAuthTraining`, JSON.stringify(res.token));

        setIsAuth(true);
        setAuthUserId(res.user._id);
      })
      .catch(console.log);
  };

  return (
    <form style={{
      display: 'flex',
      flexDirection: 'column',
      width: '45%',
    }}
      onSubmit={onSubmit}
    >
      <Input
        type="email"
        value={email}
        setValue={setEmail}
        placeholder='Enter email'
      />
      <Input
        type="password"
        value={password}
        setValue={setPassword}
        placeholder='Enter password'
      />
      <button className="waves-effect waves-light btn" type="submit">Login</button>
    </form >
  )
};

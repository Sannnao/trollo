import React, { useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Input } from '..';
import { AuthContext } from '../../context/AuthContext';
import { useInput } from '../../hooks';

export const Login = () => {
  const history = useHistory();
  const location = useLocation();
  const { setIsAuth, setAuthUserId } = useContext(AuthContext);

  const emailInput = useInput('');
  const passwordInput = useInput('');

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    fetch('/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        email: emailInput.value,
        password: passwordInput.value,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();

        throw new Error(res.statusText);
      })
      .then((res) => {
        localStorage.setItem(`JWTAuthTraining`, JSON.stringify(res.token));

        const { from } = location.state || { from: { pathname: "/" } };

        setIsAuth(true);
        setAuthUserId(res.user._id);
        history.replace(from);
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
        placeholder='Enter email'
        {...emailInput}
      />
      <Input
        type="password"
        placeholder='Enter password'
        {...passwordInput}
      />
      <button className="btn" type="submit">Login</button>
    </form >
  )
};
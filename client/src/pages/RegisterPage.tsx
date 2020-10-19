import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Input } from '../components';

export const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    fetch('http://localhost:3000/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        name,
        email,
        password,
      })
    })
      .then(res => {
        return res.json()
      })
      .then(res => {
        if (res.errors) {
          const { name, email, password } = res.errors;

        } else {
          history.push('/login');
        }
      });
  }

  return (
    <form style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    }} onSubmit={onSubmit}>
      <Input
        value={name}
        setValue={setName}
        placeholder='Enter name'
      />
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
      <button type="submit">Register</button>
    </form>
  );
};

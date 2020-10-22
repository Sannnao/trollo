import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Input } from '../components';

export const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const userData = await fetch('/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          name,
          email,
          password,
        })
      });
      const { user } = await userData.json();
      console.log(user);

      await fetch('/tasks-column', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          userId: user._id,
          title: 'To do',
          tasks: [],
        })
      });

      await fetch('/tasks-column', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          userId: user._id,
          title: 'In Progress',
          tasks: [],
        })
      });

      await fetch('/tasks-column', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          userId: user._id,
          title: 'Done',
          tasks: [],
        })
      });

      history.push('/login');
    } catch (err) {
      console.log(err);
    }
  };

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

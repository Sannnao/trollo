import React, { useState, useEffect } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { useInput } from '../../hooks';
import { Input } from '..';

export const Register = ({ parentPath }: any) => {
  const nameInput = useInput('');
  const emailInput = useInput('');
  const passwordInput = useInput('');
  const history = useHistory();
  console.log(parentPath);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userData = await fetch('/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          name: nameInput.value,
          email: emailInput.value,
          password: passwordInput.value,
        })
      });
      const { user } = await userData.json();
      console.log(user);

      history.push('/welcome/login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: 'content-fits',
    }} onSubmit={onSubmit}>
      <Input
        placeholder='Enter name'
        {...nameInput}
      />
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
      <button type="submit">Register</button>
    </form>
  );
};

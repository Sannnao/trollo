import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInput } from '../../hooks';
import { Input, AuthForm } from '..';
import { LOGIN_ROUTE } from '../../constants/routes/authRoutes';
import bcrypt from 'bcryptjs';
import { useNotify } from '../../context/NotificationContext';

export const Register = () => {
  const { notify } = useNotify();
  const nameInput = useInput('alex');
  const emailInput = useInput('sannnao.developer@gmail.com');
  const passwordInput = useInput('12345qwert');
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const bcryptPass = await bcrypt.hash(passwordInput.value, 8);

    try {
      const res = await fetch('/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          name: nameInput.value,
          email: emailInput.value,
          password: bcryptPass,
        }),
      });

      if (res.ok) {
        navigate(LOGIN_ROUTE);
      } else {
        notify({ type: 'error', message: res.statusText });
      }

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthForm onSubmit={onSubmit} submitBtnText="Register">
      <Input placeholder="Enter name" {...nameInput} />
      <Input type="email" placeholder="Enter email" {...emailInput} />
      <Input type="password" placeholder="Enter password" {...passwordInput} />
    </AuthForm>
  );
};

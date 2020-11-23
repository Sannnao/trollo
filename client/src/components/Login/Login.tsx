import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Input, AuthForm } from '..';
import { AuthContext } from '../../context/AuthContext';
import { useInput } from '../../hooks';

export const Login = () => {
  const navigate = useNavigate();
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

        const { from }: any = location.state || { from: { pathname: "/main" } };

        setIsAuth(true);
        setAuthUserId(res.user._id);
        navigate(from, { replace: true });
      })
      .catch(console.log);
  };

  return (
    <AuthForm
      onSubmit={onSubmit}
      submitBtnText='Login'
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
    </AuthForm >
  )
};

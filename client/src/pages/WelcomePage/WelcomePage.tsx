import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks';
import { Auth } from '../../components';
import './welcome-page.scss';

export const WelcomePage: React.FC = () => {
  const { isAuth } = useAuth();
  const history = useHistory();

  console.log(isAuth);

  return (
    <div className='welcome-page'>
      <h2>Welcome to our awesome app!</h2>
      <Auth />
    </div>
  )
}

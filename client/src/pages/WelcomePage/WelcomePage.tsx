import React from 'react';
import { Auth, Logo } from '../../components';
import './welcome-page.scss';

export const WelcomePage: React.FC = () => {
  return (
    <div className='welcome-page'>
      <div className='welcome-page__logo'>
        <Logo large />
      </div>
      <h2 className='welcome-page__greetings'>Welcome to our awesome app!</h2>
      <div className='welcome-page__auth-container'>
        <Auth />
      </div>
    </div>
  )
}

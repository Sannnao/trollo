import React from 'react';
import { Auth } from '../../components';
import './welcome-page.scss';

export const WelcomePage: React.FC = () => {
  return (
    <div className='welcome-page'>
      <h2>Welcome to our awesome app!</h2>
      <Auth />
    </div>
  )
}

import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTER_ROUTE } from '../../constants/routes/authRoutes';
import './auth.scss';

export const Auth: React.FC = () => {
  return (
    <div className='auth'>
      <div className='auth__nav'>
        <Link to={LOGIN_ROUTE} className="auth__link">Login</Link>
        <Link to={REGISTER_ROUTE} className="auth__link">Register</Link>
      </div>
      <div className='auth__content'>
        <Outlet />
      </div>
    </div>
  )
}

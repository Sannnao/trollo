import React from 'react'
import { Link, Route } from 'react-router-dom';
import { Login, Register } from '..';

export const Auth: React.FC = () => {
  return (
    <div className='auth'>
      <div className='auth__nav'>
        <Link to='/welcome/login' className="auth__link">Login</Link>
        <Link to='/welcome/register' className="auth__link">Register</Link>
      </div>
      <div className='auth__content'>
        <Route path='/welcome/login'>
          <Login />
        </Route>
        <Route path='/welcome/register'>
          <Register />
        </Route>
      </div>
    </div>
  )
}

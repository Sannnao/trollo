import React from 'react'
import { Link } from 'react-router-dom';
import troll from './troll.png';
import './logo.scss';

export const Logo = () => {
  return (
    <Link to='/' className="logo-container">
      <img className='logo-container__logo' src={troll} alt='trollface' />
      <h1>Trollo</h1>
    </Link>
  )
}

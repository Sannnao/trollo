import React from 'react'
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import trollSmall from './troll-small.png';
import trollLarge from './troll-large.png';
import './logo.scss';

type LogoProps = {
  large?: boolean
}

export const Logo = ({ large }: LogoProps) => {
  return (
    <Link to='/' className={clsx('logo-container', large && 'logo-container--large')}>
      <img
        className='logo-container__logo'
        src={large ? trollLarge : trollSmall}
        alt='trollface'
      />
      <h1 className='logo-container__title'>Trollo</h1>
    </Link>
  )
}

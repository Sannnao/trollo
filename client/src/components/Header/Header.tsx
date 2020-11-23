import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '..';
import './header.scss';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <Logo />
      <nav className="header__nav">
        <ul className="header__links-container">
          <li><Link to="tasks-board" className="header__link">Tasks Board</Link></li>
          <li><Link to="user-info" className="header__link">User Info</Link></li>
          <li><Link to="logout" className="header__link">Logout</Link></li>
        </ul>
      </nav>
    </header>
  );
};

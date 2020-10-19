import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import troll from '../../troll.png';
import './header.scss';

export const Header: React.FC = () => {
  const { isAuth } = useContext(AuthContext);

  return (
    <header className="header">
      <Link to='/' className="header__logo-container">
        <img className='header__logo' src={troll} alt='trollface' />
        <span>Trollo</span>
      </Link>
      <nav className="header__nav">
        <ul className="header__links-container">
          {isAuth ? (
            <>
              <li><Link to="/user-info" className="header__link">User Info</Link></li>
              <li><Link to="/logout" className="header__link">Logout</Link></li>
            </>
          ) : (
              <li><Link to="/login" className="header__link">Login</Link></li>
            )}
        </ul>
      </nav>
    </header>
  );
};

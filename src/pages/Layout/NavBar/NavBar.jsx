import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout as logoutAction } from '../../../redux/actions/accountActions';
import { useAuth } from '../../../Context';
import styles from './NavBar.module.css';

const NavBar = () => {
  const { isAuthenticated, logout: logoutContext, loading } = useAuth();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAction());
    logoutContext();
  };

  const renderNavLink = (to, label, onClick) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? `${styles.link} ${styles.linkActive}` : styles.link
      }
      onClick={onClick}
    >
      {label}
    </NavLink>
  );

  if (loading) {
    return null;
  }

  return (
    <div className={styles.header}>
      {renderNavLink('/home', 'Home')}
      {renderNavLink('/notes', 'Notes')}
      {isAuthenticated ? renderNavLink('/login', 'Log out', handleLogout) : renderNavLink('/login', 'Login')}
    </div>
  );
};

export default NavBar;

import { NavLink } from 'react-router-dom';

import css from './AuthNav.module.css';
import clsx from 'clsx';

const getMenuItemClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const AuthNav = () => {
  return (
    <div>
      <NavLink className={getMenuItemClass} to="/register">
        Register
      </NavLink>
      <NavLink className={getMenuItemClass} to="/login">
        Log In
      </NavLink>
    </div>
  );
};

export default AuthNav;

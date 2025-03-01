import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { FcHome } from 'react-icons/fc';
import { FcContacts } from 'react-icons/fc';
import css from './Navigation.module.css';
import clsx from 'clsx';

const getMenuItemClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <nav className={css.nav}>
      <NavLink className={getMenuItemClass} to="/">
        <FcHome />
        <span>Home</span>
      </NavLink>
      {isLoggedIn && (
        <NavLink className={getMenuItemClass} to="/contacts">
          <FcContacts />
          <span>Contacts</span>
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;

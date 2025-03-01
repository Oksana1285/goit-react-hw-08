import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import AuthNav from '../AuthNav/AuthNav';
import Navigation from '../Navigation/Navigation';
import UserMenu from '../UserMenu/UserMenu';
import clsx from 'clsx';
import css from './AppBar.module.css';

import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

const AppBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <header className={css.container}>
      <div data-aos="fade-down" className={css.navigation}>
        <div
          className={clsx(css.scrol, {
            [css.transparent]: scrolled,
          })}
        >
          <Navigation />
          {isLoggedIn ? <UserMenu /> : <AuthNav />}
        </div>
      </div>
    </header>
  );
};

export default AppBar;

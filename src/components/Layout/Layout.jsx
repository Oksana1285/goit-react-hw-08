import { Suspense } from 'react';
import css from './Layout.module.css';
import AppBar from '../AppBar/AppBar';

const Layout = ({ children }) => {
  return (
    <div>
      <AppBar className={css.barContainer} />
      <main className={css.pageContainer}>
        <Suspense fallback={null}>{children}</Suspense>
      </main>
    </div>
  );
};

export default Layout;

import css from './App.module.css';

import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { lazy, useEffect } from 'react';

import { selectIsRefreshing } from './redux/auth/selectors';
import { refreshUser } from './redux/auth/operations';

import Layout from './components/Layout/Layout';
import Loader from './components/Loader/Loader';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import RestrictedRoute from './components/RestrictedRoute/RestrictedRoute';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const ContactsPage = lazy(() => import('./pages/ContactsPage/ContactsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <>
      {isRefreshing ? (
        <Loader />
      ) : (
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/register"
              element={
                <RestrictedRoute
                  redirectTo="/contacts"
                  component={<RegisterPage />}
                />
              }
            />
            <Route
              path="/login"
              element={
                <RestrictedRoute
                  redirectTo="/contacts"
                  component={<LoginPage />}
                />
              }
            />
            <Route
              path="/contacts"
              element={
                <PrivateRoute
                  redirectTo="/login"
                  component={<ContactsPage />}
                />
              }
            />
            <Route
              path="*"
              element={
                <RestrictedRoute redirectTo="*" component={<NotFoundPage />} />
              }
            />
          </Routes>
        </Layout>
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default App;

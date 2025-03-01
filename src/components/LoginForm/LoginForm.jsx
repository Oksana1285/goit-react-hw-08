import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { CiLogin } from 'react-icons/ci';
import { useId } from 'react';

import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations';

import css from './LoginForm.module.css';

const validation = Yup.object().shape({
  email: Yup.string().email().required('Required'),
  password: Yup.string()
    .required('Required')
    .min(8)
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/,
      'Password must contain at least one number, one uppercase and one lowercase letter.'
    ),
});

const initialValues = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const emailId = useId();
  const passwordId = useId();

  const handleSubmit = (values, actions) => {
    dispatch(login(values));
    actions.setSubmitting(false);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validation}
    >
      {({ isSubmitting }) => (
        <Form className={css.loginContact}>
          <label className={css.loginLabel} htmlFor={emailId}>
            Email
          </label>
          <div className={css.loginInputWrap}>
            <Field
              className={css.loginInput}
              type="email"
              inputMode="email"
              name="email"
              id={emailId}
            />
            <ErrorMessage
              className={css.loginErrorMessage}
              name="email"
              component="div"
            />
          </div>

          <label className={css.loginLabel} htmlFor={passwordId}>
            Password
          </label>
          <div className={css.loginInputWrap}>
            <Field
              className={css.loginInput}
              type="password"
              inputMode="text"
              name="password"
              id={passwordId}
            />
            <ErrorMessage
              className={css.loginErrorMessage}
              name="password"
              component="div"
            />
          </div>

          <button
            className={css.loginButton}
            type="submit"
            disabled={isSubmitting}
          >
            <CiLogin /> <span>LogIn</span>
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;

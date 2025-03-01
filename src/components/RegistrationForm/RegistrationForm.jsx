import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useId } from 'react';
import { register } from '../../redux/auth/operations';

import css from './RegistrationForm.module.css';

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

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();

  const handleSubmit = (values, actions) => {
    dispatch(register(values));
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
        <Form className={css.registerContact}>
          <label className={css.registerLabel} htmlFor={nameId}>
            Name
          </label>
          <div className={css.registerInputWrap}>
            <Field
              className={css.registerInput}
              type="text"
              name="name"
              id={nameId}
            />
            <ErrorMessage
              className={css.registerErrorMessage}
              name="name"
              component="div"
            />
          </div>

          <label className={css.registerLabel} htmlFor={emailId}>
            Email
          </label>
          <div className={css.registerInputWrap}>
            <Field
              className={css.registerInput}
              type="email"
              inputMode="email"
              name="email"
              id={emailId}
            />
            <ErrorMessage
              className={css.registerErrorMessage}
              name="email"
              component="div"
            />
          </div>

          <label className={css.registerLabel} htmlFor={passwordId}>
            Password
          </label>
          <div className={css.registerInputWrap}>
            <Field
              className={css.registerInput}
              type="password"
              inputMode="text"
              name="password"
              id={passwordId}
            />
            <ErrorMessage
              className={css.registerErrorMessage}
              name="password"
              component="div"
            />
          </div>

          <button
            className={css.registerButton}
            type="submit"
            disabled={isSubmitting}
          >
            Register
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;

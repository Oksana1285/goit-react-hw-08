import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useId } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsOps';

import css from './ContactForm.module.css';

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, `Too Short!`)
    .max(50, `Too Long!`)
    .required('Required field!'),
  number: Yup.string()
    .min(3, `Short!`)
    .max(50, `Long!`)
    .matches(/^\d{3}-\d{2}-\d{2}$/, 'Invalid phone number format')
    .required('Required field!'),
});

const initialValues = {
  name: '',
  number: '',
};

const ContactForm = ({ onAdd }) => {
  const nameId = useId();
  const numberId = useId();

  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values));
    actions.setSubmitting(false);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={contactSchema}
    >
      {({ isSabmitting }) => (
        <Form className={css.formContact}>
          <label className={css.formLabel} htmlFor={nameId}>
            Name
          </label>
          <div className={css.formInputWrap}>
            <Field
              className={css.formInput}
              type="text"
              name="name"
              id={nameId}
              placeholder="Name"
            />
            <ErrorMessage
              className={css.formErrorMessage}
              name="name"
              component="div"
            />
          </div>
          <label className={css.formLabel} htmlFor={numberId}>
            Number
          </label>
          <div className={css.formInputWrap}>
            <Field
              className={css.formInput}
              type="tel"
              inputMode="tel"
              name="number"
              id={numberId}
              placeholder="xxx-xx-xx"
            />
            <ErrorMessage
              className={css.formErrorMessage}
              name="number"
              component="div"
            />
          </div>
          <button
            className={css.formButton}
            type="submit"
            disabled={isSabmitting}
          >
            Add contact
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;

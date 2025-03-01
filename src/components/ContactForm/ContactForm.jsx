import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contacts/operations';
import toast from 'react-hot-toast';

import css from './ContactForm.module.css';

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required field!'),
  number: Yup.string()
    .matches(/^\d{3}-\d{2}-\d{2}$/, 'Format must be xxx-xx-xx')
    .required('Required field!'),
});

const initialValues = {
  name: '',
  number: '',
};

const ContactForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values))
      .unwrap()
      .then(() => {
        toast.success(`Contact ${values.name} successfully added!`);
        actions.setSubmitting(false);
        actions.resetForm();
      })
      .catch(() => {
        toast.error('Failed to add contact');
        actions.setSubmitting(false);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={contactSchema}
    >
      {(
        { isSubmitting } // Fixed typo here
      ) => (
        <Form className={css.formContact}>
          <label className={css.formLabel} htmlFor="name">
            Name
          </label>
          <div className={css.formInputWrap}>
            <Field
              className={css.formInput}
              type="text"
              name="name"
              id="name"
              placeholder="Name"
            />
            <ErrorMessage
              className={css.formErrorMessage}
              name="name"
              component="div"
            />
          </div>

          <label className={css.formLabel} htmlFor="number">
            Number
          </label>
          <div className={css.formInputWrap}>
            <Field
              className={css.formInput}
              type="tel"
              name="number"
              id="number"
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
            disabled={isSubmitting} // Fixed typo here
          >
            Add contact
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;

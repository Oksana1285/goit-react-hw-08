import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { ImCancelCircle } from 'react-icons/im';
import { FaRegSave } from 'react-icons/fa';
import { useHotkeys } from 'react-hotkeys-hook';
import { selectContacts } from '../../redux/contacts/selectors';

import css from './EditContactModal.module.css';

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

const EditContactModal = ({ handleUpdateContact, handleCloseModal, id }) => {
  const contacts = useSelector(selectContacts);

  const contact = useMemo(
    () => contacts.find(contact => contact.id === id),
    [contacts, id]
  );

  const [initialValues, setInitialValues] = useState({
    name: '',
    number: '',
  });

  useEffect(() => {
    if (contact) {
      setInitialValues({
        name: contact ? contact.name : '',
        number: contact ? contact.number : '',
      });
    }
  }, [contact]);

  const handleSubmit = (values, actions) => {
    handleUpdateContact({ id, ...values });

    actions.setSubmitting(false);
    actions.resetForm();
  };

  useHotkeys('esc', () => handleCloseModal());

  return (
    <div className={css.modalOverlay}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={contactSchema}
      >
        {({ isSubmitting, values, handleReset, handleChange }) => (
          <div>
            <Form className={css.modalForm}>
              <label className={css.modalLabel} htmlFor="name">
                Name
              </label>
              <div className={css.modalInputWrap}>
                <Field
                  className={css.modalInput}
                  type="text"
                  name="name"
                  value={values.name}
                  placeholder="Enter FirstName and LastName"
                  id="name"
                  onChange={handleChange}
                />
                <ErrorMessage
                  className={css.modalErrorMessage}
                  name="name"
                  component="div"
                />
              </div>

              <label className={css.modalLabel} htmlFor="number">
                Number
              </label>
              <div className={css.modalInputWrap}>
                <Field
                  className={css.modalInput}
                  type="tel"
                  name="number"
                  value={values.number}
                  placeholder="Phone format: XXX-XXX-XXXX"
                  id="number"
                  onChange={handleChange}
                />
                <ErrorMessage
                  className={css.modalErrorMessage}
                  name="number"
                  component="div"
                />
              </div>
              <div className={css.btnWrap}>
                <button
                  className={css.modalButton}
                  type="submit"
                  disabled={isSubmitting}
                >
                  <FaRegSave />
                  <span>Save</span>
                </button>
                <button
                  className={css.modalButton}
                  type="button"
                  onClick={() => {
                    handleReset();
                    handleCloseModal();
                  }}
                >
                  <ImCancelCircle />
                  <span>Cancel</span>
                </button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default EditContactModal;

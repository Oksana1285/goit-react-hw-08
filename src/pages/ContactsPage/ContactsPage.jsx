import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ContactForm from '../../components/ContactForm/ContactForm';
import ContactList from '../../components/ContactList/ContactList';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import SearchBox from '../../components/SearchBox/SearchBox';
import TitleDocument from '../../components/TitleDocument/TitleDocument';
import {
  selectError,
  selectFilteredContacts,
  selectLoading,
} from '../../redux/contacts/selectors';
import { fetchContacts } from '../../redux/contacts/operations';

import css from './ContactsPage.module.css';

const ContactsPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const contacts = useSelector(selectFilteredContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <section>
      <div className={css.bgImg}></div>
      <TitleDocument>Your contacts page</TitleDocument>
      <div className={css.positionSection}>
        <ContactForm />
        <div>
          <SearchBox />
          {loading && <Loader />}
          {error && <ErrorMessage />}
          {contacts.length > 0 && !error && !loading && (
            <ContactList contacts={contacts} />
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactsPage;

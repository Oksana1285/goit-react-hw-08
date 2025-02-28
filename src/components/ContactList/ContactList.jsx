import { useSelector } from 'react-redux';

import Contact from '../Contact/Contact';
import css from './ContactList.module.css';
import {
  selectError,
  selectContactsFiltered,
  selectLoading,
} from '../../redux/contactsSlice';

import Loader from '../Loader/Loader';

const ContactList = () => {
  const contacts = useSelector(selectContactsFiltered);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  return (
    <ul className={css.contactList}>
      {loading && <Loader />}
      {!loading &&
        contacts &&
        !error &&
        contacts.map(({ id, number, name }) => (
          <Contact key={id} id={id} number={number} name={name} />
        ))}
      {error && <div>`Error: ${error} `</div>}
    </ul>
  );
};

export default ContactList;

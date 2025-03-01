import TitleDocument from '../../components/TitleDocument/TitleDocument';
import { FaAddressCard } from 'react-icons/fa';
import css from './HomePage.module.css';

const HomePage = () => {
  return (
    <>
      <TitleDocument>Phonebook</TitleDocument>
      <section className={css.bgImg}>
        <div className={css.container}>
          <h1 className={css.mainTitle}>
            This application created to save your contacts in one place{' '}
          </h1>
          <FaAddressCard color="blue" size={'18rem'} />
          <p className={css.text}>
            {' '}
            (Please register to start saving your contacts)
          </p>
        </div>
      </section>
    </>
  );
};

export default HomePage;

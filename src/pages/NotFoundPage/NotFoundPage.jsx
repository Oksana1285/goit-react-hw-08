import { Link, useLocation } from 'react-router-dom';
import TitleDocument from '../../components/TitleDocument/TitleDocument';
import css from './NotFoundPage.module.css';

const NoFoundPage = () => {
  const location = useLocation();
  const backHrefLink = location.state?.from ?? '/';

  return (
    <>
      <TitleDocument>Page not found</TitleDocument>
      <section className={css.containerNotFound}>
        <div className={css.notFound}>
          <h1 className={css.title}>404 - Page Not Found</h1>
          <p className={css.notFoundMessage}>
            Sorry, the page you are looking for could not be found.
          </p>
          <Link to={backHrefLink}>
            <button className={css.notFoundBtn}>Go to Homepage</button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default NoFoundPage;

import { Helmet, HelmetProvider } from 'react-helmet-async';

const TitleDocument = ({ children }) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{children}</title>
      </Helmet>
    </HelmetProvider>
  );
};

export default TitleDocument;

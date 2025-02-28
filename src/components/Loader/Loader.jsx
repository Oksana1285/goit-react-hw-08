import { Bars } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.loader}>
      <Bars
        visible={true}
        height="80"
        width="80"
        color="##F6F6F6"
        radius="9"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;

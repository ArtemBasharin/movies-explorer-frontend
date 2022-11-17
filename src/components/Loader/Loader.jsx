import { useContext } from 'react';
import LoaderContext from '../../contexts/LoaderContext';
import './Loader.css';

export default function Loader() {
  const { isLoaderVisible } = useContext(LoaderContext)

  return (
    <>
      {isLoaderVisible && (
        <div className="preloader">
          <div className="preloader__container">
            <span className="preloader__round"></span>
          </div>
        </div>
      )}
    </>
  );
}

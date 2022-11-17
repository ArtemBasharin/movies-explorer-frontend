import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import LoaderContext from '../../contexts/LoaderContext';
import './Loader.css';

export default function Loader() {
  const { isLoaderVisible } = useContext(LoaderContext)
  const { currentUser } = useContext(CurrentUserContext)

  if (!isLoaderVisible) return null

  return (
    <div
      className="preloader"
      style={currentUser ? {} : { backgroundColor: 'white' }}
    >
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </div>
  );
}

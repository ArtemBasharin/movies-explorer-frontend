import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './Loader.css';

export default function Loader() {
  const { currentUser } = useContext(CurrentUserContext)

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

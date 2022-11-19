import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts';
import './Loader.css';

export default function Loader() {
  const { currentUser } = useContext(CurrentUserContext)

  return (
    <div
      className="preloader"
      style={currentUser ? {} : { backgroundColor: 'white' }}
    >
      <div className="preloader__container">
        <span className="preloader__round"/>
      </div>
    </div>
  );
}

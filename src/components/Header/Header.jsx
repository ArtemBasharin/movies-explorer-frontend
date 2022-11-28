import { Link } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import logo from '../../images/logo.svg';

export const headerEndpoints = ["/movies", "/saved-movies", "/profile", "/"];

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <Link to='/' className='header__link'>
          <img src={logo} alt="Логотип" />
        </Link>

        <Navigation/>
      </div>
    </header>
  );
}

export default Header;

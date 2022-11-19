import "./Navigation.css";
import { Link, NavLink } from "react-router-dom";
import Burger from "../Burger/Burger";
import { useContext, useState } from "react";
import useEscapePress from "../../hooks/useEscapePress";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const NavigationItem = ({
  to,
  label,
  activeLink,
  className = '',
  exact = false,
}) => {
  return (
    <li className="navigation__item">
      <NavLink
        to={to}
        exact={exact}
        className={`navigation__link ${className}`}
        activeClassName={activeLink}
      >
        {label}
      </NavLink>
    </li>
  )
}

export default function Navigation() {
  const { currentUser } = useContext(CurrentUserContext);
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);

  function onClickBurger(isBurgerOpened) {
    setIsBurgerOpened(!isBurgerOpened);
  }

  useEscapePress(onClickBurger, isBurgerOpened);

  const activeLink = `navigation__link_active_${isBurgerOpened ? 'mobile' : 'desktop'}`;

  function handleClickOverlay(e) {
    e.stopPropagation();
  }

  if (currentUser) return (
    <nav
      className={`navigation navigation_state_${isBurgerOpened ? 'opened' : 'closed'}`}
      onClick={isBurgerOpened ? onClickBurger : undefined}
    >
      <Burger
        isBurgerOpened={isBurgerOpened}
        onClickBurger={onClickBurger}
      />

      <ul
        className={`navigation__list navigation__list_logged navigation__list_state_${isBurgerOpened ? 'opened' : 'closed'}`}
        onClick={handleClickOverlay}
      >
        {isBurgerOpened && (
          <NavigationItem
            to="/"
            label="Главная"
            activeClassName={activeLink}
            exact
          />
        )}

        <NavigationItem
          to="/movies"
          label="Фильмы"
          activeClassName={activeLink}
        />

        <NavigationItem
          to="/saved-movies"
          label="Сохранённые фильмы"
          activeClassName={activeLink}
        />

        <NavigationItem
          to="/profile"
          label="Аккаунт"
          activeClassName={activeLink}
          className="navigation__link_type_account"
        />
      </ul>
    </nav>
  )

  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li>
          <Link
            to="/signup"
            className="navigation__link navigation__link_landing"
          >
            Регистрация
          </Link>
        </li>
        <li>
          <Link
            to="/signin"
            className="navigation__link navigation__link_landing navigation__link_signin"
          >
            Войти
          </Link>
        </li>
      </ul>
    </nav>
  );
}

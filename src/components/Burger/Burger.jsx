import './Burger.css';
import { useMediaQuery } from 'react-responsive';
import { useEffect } from 'react';

export default function Burger({isBurgerOpened, onClickBurger}) {
  const isMobile = useMediaQuery({ query: `(max-width: 800px)` });

  const handleOnClickBurger = () => {
    onClickBurger(isBurgerOpened);
  }

  useEffect(() => {
    if (!isMobile && isBurgerOpened) onClickBurger();
  }, [isBurgerOpened, isMobile, onClickBurger]);

  return (
    <button
      type="button"
      className={`burger-button burger-button_${isBurgerOpened ? 'on' : 'off'}`}
      onClick={handleOnClickBurger}
    >
      <span/>
    </button>
  )
}

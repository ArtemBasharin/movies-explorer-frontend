import './Popup.css';
import useEscapePress from '../../hooks/useEscapePress.jsx';
import PopupContext from '../../contexts/PopupContext';
import { useContext } from 'react';

export default function Popup() {
  const { popup, setPopup } = useContext(PopupContext)
  const { isOpen, successful, text } = popup

  function onClose() {
    setPopup({ ...popup, isOpen: false });
  }

  function handleClickOverlay(e) {
    e.stopPropagation();
  }

  useEscapePress(onClose, isOpen);

  return (
    <div
      className={`popup ${isOpen && 'popup_opened'}`}
      onClick={onClose}
    >
      <div className="popup__container" onClick={handleClickOverlay}>
        <div className={`popup__status popup__status_${successful ? 'success' : 'fail'}`} />
        <h2 className="popup__title">{text}</h2>

        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

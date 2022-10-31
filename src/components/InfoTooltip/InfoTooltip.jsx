import './InfoTooltip.css';
import useEscapePress from '../../reacthooks/useEscapePress.jsx';

export default function InfoTooltip({ onClose, status: { isOpen, successful, text } }) {
  function handleClickOverlay(e) {
    e.stopPropagation();
  }

  useEscapePress(onClose, isOpen);

  return (
    <div
      className={`infotooltip ${isOpen && 'infotooltip_opened'}`}
      onClick={onClose}
    >
      <div className="infotooltip__container" onClick={handleClickOverlay}>
        <div
          className={`infotooltip__status ${
            successful
              ? 'infotooltip__status_success'
              : 'infotooltip__status_fail'
          }`}
        ></div>
        <h2 className="infotooltip__title">{text}</h2>
        <button
          type="button"
          className="infotooltip__close-button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

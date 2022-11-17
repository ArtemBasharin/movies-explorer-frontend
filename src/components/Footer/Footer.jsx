import "./Footer.css";

export const footerEndpoints = ["/movies", "/saved-movies", "/"];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <h2 className="footer__title">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h2>
        <div className="footer__navigation">
          <p className="footer__copyright">&copy;{new Date().getFullYear()}</p>
          <ul className="footer__links">
            <li>
              <a
                href="https://practicum.yandex.ru/"
                target="_blank"
                rel="nonoopener noreferrer"
                className="footer__link"
              >
                Яндекс.Практикум
              </a>
            </li>
            <li>
              <a
                href="https://github.com/ArtemBasharin"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__link"
              >
                Github
              </a>
            </li>
            <li>
              <a
                href="https://career.habr.com/artembash"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__link"
              >
                Career.habr
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

import './Portfolio.css';

export default function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__list">
          <li className="portfolio__item">
            <a href="https://github.com/ArtemBasharin/how-to-learn" className="portfolio__link" target="_blank" rel="noreferrer"> Статичный сайт</a>
          </li>
          <li className="portfolio__item">
            <a href="https://github.com/ArtemBasharin/russian-travel" className="portfolio__link" target="_blank" rel="noreferrer">Адаптивный сайт</a>
          </li>
          <li className="portfolio__item">
            <a href="https://github.com/ArtemBasharin/react-mesto-api-full" className="portfolio__link" target="_blank" rel="noreferrer">Одностраничное приложение</a>
          </li>
        </ul>
      </div>
    </section>
  );
}

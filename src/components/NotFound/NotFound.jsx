import "./NotFound.css";


export default function NotFound({ goBack }) {
  return (
    <main className="notfound">
      <p className="notfound__text-container">
        <span className="notfound__error">404</span>
        <span className="notfound__error-name">Страница не найдена</span>
      </p>
      <button className="notfound__button" onClick={goBack}>
        Назад
      </button>
    </main>
  )
}

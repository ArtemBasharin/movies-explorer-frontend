import { useHistory } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  const history = useHistory();

  function goBack() {
    history.goBack();
  }

  return (
    <main className="notfound">
      <p className="notfound__text-container">
        <span className="notfound__error">404</span>
        <span className="notfound__error-name">Страница не найдена</span>
      <button className="notfound__button" onClick={goBack}>Назад</button>
      </p>
    </main>
  )
}

import "./MoviesCard.css";
import { getHumanizedDuration } from "../../utils";
import mainApi from "../../api/MainApi";
import { useContext } from "react";
import { PopupContext, SavedMoviesContext } from "../../contexts";

export default function MoviesCard({
  movie,
  saved,
  onLikeClick,
  isSavedMoviesPage,
}) {
  const { setPopup } = useContext(PopupContext)
  const { savedMovies, setSavedMovies } = useContext(SavedMoviesContext)
  const title = isSavedMoviesPage ? 'Удалить фильм из сохранённых' : `${saved ? 'Удалить фильм из сохранённых' : 'Сохранить фильм'}`

  function handleLikeClick() {
    onLikeClick(movie);
  }

  function handleDeleteMovie(movie) {
    const savedMovie = savedMovies.find(item => item.movieId === movie.id || item.movieId === movie.movieId);

    mainApi
      .deleteMovie(savedMovie._id)
      .then(() => {
        const moviesWithoutDeleted = savedMovies.filter(m => !(movie.id === m.movieId || movie.movieId === m.movieId));

        setSavedMovies(moviesWithoutDeleted);
      })
      .catch((err) =>
        setPopup({
          isOpen: true,
          successful: false,
          text: err,
        })
      );
  }

  function handleDeleteClick() {
    handleDeleteMovie(movie);
  }

  return (
    <li className="movies-card">
      <article className="movies-card__item">
        <a target="_blank" rel="noreferrer" href={movie.trailerLink}>
          <img
            src={movie.image}
            alt={movie.nameRU}
            title={`Описание: ${movie.description}\n\nСнято: ${movie.country} ${movie.year}г.`}
            className="movies-card__poster"
          />
        </a>

        <div className="movies-card__description">
          <h2 className="movies-card__title">{movie.nameRU}</h2>

          <button
            type="button"
            className={`movies-card__button movies-card__button_type_${isSavedMoviesPage ? 'delete' : (saved ? 'saved' : 'save')}`}
            onClick={isSavedMoviesPage ? handleDeleteClick : (saved ? handleDeleteClick : handleLikeClick)}
            aria-label={title}
            title={title}
          />
        </div>

        <span className="movies-card__duration">
          {getHumanizedDuration(movie.duration)}
        </span>
      </article>
    </li>
  );
}

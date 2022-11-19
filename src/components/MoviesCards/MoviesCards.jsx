import "./MoviesCards.css";
import { useState, useEffect, useContext, useCallback } from "react";
import useScreenWidth from "../../hooks/useScreenWidth";
import { DEVICE_PARAMS } from "../../utils/constants.js";
import MoviesCard from "../MoviesCard/MoviesCard";
import { SavedMoviesContext } from "../../contexts";

const { desktop, tablet, mobile } = DEVICE_PARAMS

export default function MoviesCards({
  movies,
  onLikeClick,
  isSavedMoviesPage,
}) {
  const screenWidth = useScreenWidth();
  const [showMovieList, setShowMovieList] = useState([]);
  const [cardsShowDetails, setCardsShowDetails] = useState({ total: 12, more: 3 });
  const { savedMovies } = useContext(SavedMoviesContext)

  const isMovieCardSaved = useCallback(
    movie => savedMovies.find(item => item.movieId === (movie.id || movie.movieId)),
    [savedMovies],
  )

  useEffect(() => {
    if (!isSavedMoviesPage) {
      if (screenWidth >= desktop.width) setCardsShowDetails(desktop.cards)
      else if (screenWidth <= mobile.width) setCardsShowDetails(mobile.cards)
      else setCardsShowDetails(tablet.cards);
    }
  }, [isSavedMoviesPage, screenWidth]);

  useEffect(() => {
    if (movies.length) {
      const res = movies.filter((_, i) => i < cardsShowDetails.total);
      setShowMovieList(res);
    }
  }, [movies, cardsShowDetails.total]);

  function handleClickMoreMovies() {
    const start = showMovieList.length;
    const end = start + cardsShowDetails.more;
    const additional = movies.length - start;

    if (additional > 0) {
      const newCards = movies.slice(start, end);
      setShowMovieList([...showMovieList, ...newCards]);
    }
  }

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__list">
        {showMovieList.map(movie => (
          <MoviesCard
            key={movie.id || movie._id}
            saved={isMovieCardSaved(movie)}
            onLikeClick={onLikeClick}
            movie={movie}
            isSavedMoviesPage={isSavedMoviesPage}
          />
        ))}
      </ul>

      {!isSavedMoviesPage && showMovieList.length >= 5 && showMovieList.length < movies.length && (
        <button
          className="movies-card-list__show-more"
          onClick={handleClickMoreMovies}
        >
          Ещё
        </button>
      )}
    </section>
  );
}

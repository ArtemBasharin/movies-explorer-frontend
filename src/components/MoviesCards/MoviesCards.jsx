import "./MoviesCards.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useScreenWidth from "../../hooks/useScreenWidth.jsx";
import { DEVICE_PARAMS } from "../../utils/consts.js";
import { getSavedMovieCard } from "../../utils/utils.js";
import MoviesCard from "../MoviesCard/MoviesCard.jsx";

export default function MoviesCards({
  movies,
  savedMovies,
  onLikeClick,
}) {
  const screenWidth = useScreenWidth();

  const { desktop, tablet, mobile } = DEVICE_PARAMS;
  const [isMount, setIsMount] = useState(true);
  const [showMovieList, setShowMovieList] = useState([]);
  const [cardsShowDetails, setCardsShowDetails] = useState({
    total: 12,
    more: 3,
  });

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/movies") {
      if (screenWidth > desktop.width) {
        setCardsShowDetails(desktop.cards);
      } else if (screenWidth <= desktop.width && screenWidth > mobile.width) {
        setCardsShowDetails(tablet.cards);
      } else {
        setCardsShowDetails(mobile.cards);
      }
      return () => setIsMount(false);
    }
  }, [screenWidth, isMount, desktop, tablet, mobile, location.pathname]);

  useEffect(() => {
    if (movies.length) {
      const res = movies.filter((item, i) => i < cardsShowDetails.total);
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
        {showMovieList.map((movie) => (
          <MoviesCard
            key={movie.id || movie._id}
            saved={getSavedMovieCard(savedMovies, movie)}
            onLikeClick={onLikeClick}
            movie={movie}
          />
        ))}
      </ul>
      {location.pathname === "/movies" &&
        showMovieList.length >= 5 &&
        showMovieList.length < movies.length && (
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

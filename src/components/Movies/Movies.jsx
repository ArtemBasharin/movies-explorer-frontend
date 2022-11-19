import "./Movies.css";
import { useState, useContext, useEffect, useCallback } from "react";
import { filterMovies } from "../../utils";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCards from "../MoviesCards/MoviesCards";
import mainApi from "../../api/MainApi";
import { SEARCH_QUERY_LS_KEY, SHORT_MOVIES_MODE_LS_KEY } from "../../utils/constants";
import { MoviesContext, PopupContext, SavedMoviesContext } from "../../contexts";
import { useLocation } from "react-router-dom";

export default function Movies() {
  const location = useLocation()
  const isSavedMoviesPage = location.pathname === '/saved-movies'
  const { setPopup } = useContext(PopupContext)
  const { savedMovies, setSavedMovies } = useContext(SavedMoviesContext)
  const { movies } = useContext(MoviesContext)
  const [shortMoviesMode, setShortMoviesMode] = useState(localStorage.getItem(SHORT_MOVIES_MODE_LS_KEY) === 'true');
  const [userQuery, setUserQuery] = useState(localStorage.getItem(SEARCH_QUERY_LS_KEY) || '');
  const [filteredMovies, setFilteredMovies] = useState([]);

  function onLikeClick(movie) {
    mainApi
      .addNewMovie(movie)
      .then(newMovie => setSavedMovies([newMovie, ...savedMovies]))
      .catch(err =>
        setPopup({
          isOpen: true,
          successful: false,
          text: err,
        })
      )
  }

  const handleSetFilteredMovies = useCallback((userQuery, shortMoviesMode) => {
    const moviesList = filterMovies(
      isSavedMoviesPage ? savedMovies : movies,
      userQuery,
      shortMoviesMode
    )

    setFilteredMovies(moviesList)

    if (moviesList.length === 0) {
      setPopup({
        isOpen: true,
        successful: false,
        text: "Ничего не найдено",
      })
    }
  }, [isSavedMoviesPage, movies, savedMovies, setPopup])

  useEffect(() => {
    if (movies.length === 0) return

    if (isSavedMoviesPage || userQuery.length > 0) {
      handleSetFilteredMovies(userQuery, shortMoviesMode)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, movies.length])

  useEffect(() => {
    if (isSavedMoviesPage && filteredMovies.length > savedMovies.length) {
      handleSetFilteredMovies(userQuery, shortMoviesMode)
    }
  }, [filteredMovies.length, handleSetFilteredMovies, isSavedMoviesPage, savedMovies.length, shortMoviesMode, userQuery])


  function handleSearchSubmit(newSearchQuery) {
    setUserQuery(newSearchQuery)
    handleSetFilteredMovies(newSearchQuery, shortMoviesMode)
    localStorage.setItem(SEARCH_QUERY_LS_KEY, newSearchQuery);
  }

  function handleShortMoviesFilterChange(newShortMoviesMode) {
    setShortMoviesMode(newShortMoviesMode)
    handleSetFilteredMovies(userQuery, newShortMoviesMode)
    localStorage.setItem(SHORT_MOVIES_MODE_LS_KEY, newShortMoviesMode);
  }

  return (
    <main className="movies">
      <SearchForm
        onSearchSubmit={handleSearchSubmit}
        onShortMoviesFilterChange={handleShortMoviesFilterChange}
        userQuery={userQuery}
        shortMoviesMode={shortMoviesMode}
      />

      {filteredMovies.length > 0 && (
        <MoviesCards
          movies={filteredMovies}
          onLikeClick={onLikeClick}
          isSavedMoviesPage={isSavedMoviesPage}
        />
      )}
    </main>
  );
}

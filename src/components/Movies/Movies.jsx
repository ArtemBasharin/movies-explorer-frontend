import "./Movies.css";
import { useState, useContext, useEffect, useCallback } from "react";
import { filterMovies, setMoviesDefaults } from "../../utils";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCards from "../MoviesCards/MoviesCards";
import mainApi from "../../api/MainApi";
import moviesApi from "../../api/MoviesApi";
import { SEARCH_QUERY_LS_KEY, SHORT_MOVIES_MODE_LS_KEY } from "../../utils/constants";
import { MoviesContext, PopupContext, SavedMoviesContext } from "../../contexts";
import { useLocation } from "react-router-dom";

export default function Movies() {
  const location = useLocation()
  const isSavedMoviesPage = location.pathname === '/saved-movies'
  const { setPopup } = useContext(PopupContext)
  const { savedMovies, setSavedMovies } = useContext(SavedMoviesContext)
  const { movies, setMovies } = useContext(MoviesContext)
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

  const handleSetFilteredMovies = useCallback(async (userQuery, shortMoviesMode) => {
    let firstSearchMovies = []

    if (!isSavedMoviesPage && movies.length === 0) {
      firstSearchMovies = await moviesApi.getMovies()
      setMovies(setMoviesDefaults(firstSearchMovies))
    }

    const moviesList = filterMovies(
      isSavedMoviesPage ? savedMovies : (firstSearchMovies.length > 0 ? firstSearchMovies : movies),
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
  }, [isSavedMoviesPage, movies, savedMovies, setMovies, setPopup])

  useEffect(() => {
    if (isSavedMoviesPage) {
      setUserQuery('')
      setShortMoviesMode(false)
      setFilteredMovies(savedMovies)
    } else {
      const savedQuery = localStorage.getItem(SEARCH_QUERY_LS_KEY) || ''
      const savedMode = localStorage.getItem(SHORT_MOVIES_MODE_LS_KEY) === 'true'

      setUserQuery(savedQuery)
      setShortMoviesMode(savedMode)
      handleSetFilteredMovies(savedQuery, savedMode)
    }
  }, [handleSetFilteredMovies, isSavedMoviesPage, location.pathname, movies.length, savedMovies])

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
        key={userQuery}
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

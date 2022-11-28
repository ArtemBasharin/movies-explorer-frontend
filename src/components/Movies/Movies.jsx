import "./Movies.css";
import { useState, useContext, useEffect, useCallback } from "react";
import { filterMovies } from "../../utils";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCards from "../MoviesCards/MoviesCards";
import mainApi from "../../api/MainApi";
import moviesApi from "../../api/MoviesApi";
import { FILTERED_ALL_MOVIES_LS_KEY, saveMoviesToLS, SEARCH_QUERY_LS_KEY, SHORT_MOVIES_MODE_LS_KEY } from "../../utils/constants";
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
      .then(newMovie => {
        const moviesWithLiked = [newMovie, ...savedMovies]

        saveMoviesToLS(moviesWithLiked);
        setSavedMovies(moviesWithLiked)
      })
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
      setMovies(firstSearchMovies)
    }

    const moviesList = filterMovies(
      isSavedMoviesPage ? savedMovies : (firstSearchMovies.length > 0 ? firstSearchMovies : movies),
      userQuery,
      shortMoviesMode
    )

    setFilteredMovies(moviesList)

    if (!isSavedMoviesPage) localStorage.setItem(FILTERED_ALL_MOVIES_LS_KEY, JSON.stringify(moviesList));

    if (moviesList.length === 0) {
      setPopup({
        isOpen: true,
        successful: false,
        text: "Ничего не найдено",
      })
    }
  }, [isSavedMoviesPage, movies, savedMovies, setMovies, setPopup])

  // on page open/return
  useEffect(() => {
    if (isSavedMoviesPage) {
      setUserQuery('')
      setShortMoviesMode(false)
      setFilteredMovies(savedMovies)
    } else {
      const savedQuery = localStorage.getItem(SEARCH_QUERY_LS_KEY) || ''
      const savedMode = localStorage.getItem(SHORT_MOVIES_MODE_LS_KEY) === 'true'
      let filteredAllMovies = JSON.parse(localStorage.getItem(FILTERED_ALL_MOVIES_LS_KEY))

      setUserQuery(savedQuery)
      setShortMoviesMode(savedMode)

      if (filteredAllMovies) setFilteredMovies(filteredAllMovies)
      else setFilteredMovies([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  useEffect(() => {
    if (isSavedMoviesPage) {
      handleSetFilteredMovies(userQuery, shortMoviesMode)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedMovies.length])

  function handleSearchSubmit(newSearchQuery) {
    setUserQuery(newSearchQuery)
    handleSetFilteredMovies(newSearchQuery, shortMoviesMode)
    if (!isSavedMoviesPage) localStorage.setItem(SEARCH_QUERY_LS_KEY, newSearchQuery);
  }

  function handleShortMoviesFilterChange(newShortMoviesMode) {
    setShortMoviesMode(newShortMoviesMode)
    if (userQuery !== '') handleSetFilteredMovies(userQuery, newShortMoviesMode)
    if (!isSavedMoviesPage) localStorage.setItem(SHORT_MOVIES_MODE_LS_KEY, newShortMoviesMode);
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

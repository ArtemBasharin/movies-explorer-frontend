import { SHORT_MOVIES_DURATION } from "./constants.js";

function setMoviesDefaults(movies) {
  const clone = JSON.parse(JSON.stringify(movies))

  return clone.map(movie => {
    if (!movie.image) {
      movie.image = "https://unsplash.com/photos/sKOTAa1_VRQ";
      movie.thumbnail = "https://unsplash.com/photos/sKOTAa1_VRQ";
    } else {
      movie.thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`;
      movie.image = `https://api.nomoreparties.co${movie.image.url}`;
    }

    if (!movie.country) movie.country = "Russia";
    if (!movie.nameEN) movie.nameEN = movie.nameRU;

    return movie
  });
}

const filterShortMovies = movies => movies.filter(m => m.duration < SHORT_MOVIES_DURATION);

function filterMovies(movies, userQuery, shortMoviesCheckbox) {
  const moviesByUserQuery = movies.filter(movie => {
    const movieRu = String(movie.nameRU).toLowerCase().trim();
    const movieEn = String(movie.nameEN).toLowerCase().trim();
    const userMovie = userQuery.toLowerCase().trim();

    return movieRu.indexOf(userMovie) > -1 || movieEn.indexOf(userMovie) > -1
  })

  return shortMoviesCheckbox ? filterShortMovies(moviesByUserQuery) : moviesByUserQuery
}

function getHumanizedDuration(duration) {
  const hours = Math.trunc(duration / 60);
  const minutes = duration % 60;

  return hours === 0 ? `${minutes}м` : `${hours}ч ${minutes}м`
}

export {
  setMoviesDefaults,
  filterMovies,
  filterShortMovies,
  getHumanizedDuration,
};

export const SHORT_MOVIES_DURATION = 40;
export const SEARCH_QUERY_LS_KEY = "searchQuery";
export const SHORT_MOVIES_MODE_LS_KEY = "shortMoviesMode";
export const ALL_MOVIES_LS_KEY = "allMovies";
export const FILTERED_ALL_MOVIES_LS_KEY = "filteredAllMovies";
export const SAVED_MOVIES_LS_KEY = "savedMovies";
export const JWT_LS_KEY = "jwt";

export const saveMoviesToLS = movies => localStorage.setItem(SAVED_MOVIES_LS_KEY, JSON.stringify(movies))

export const DEVICE_PARAMS = {
  desktop: {
    width: 1280,
    cards: {
      total: 12,
      more: 3,
    },
  },
  tablet: {
    width: 768,
    cards: {
      total: 8,
      more: 2,
    },
  },
  mobile: {
    width: 480,
    cards: {
      total: 5,
      more: 2,
    },
  },
};

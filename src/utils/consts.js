const API_URL = "https://api.movex.nomoredomains.sbs";
// const API_URL = "http://localhost:3000";
const MOVIES_URL = "https://api.nomoreparties.co/beatfilm-movies";
const SHORTMOVIES_DURATION = 40;
const DEVICE_PARAMS = {
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
    width: 583,
    cards: {
      total: 5,
      more: 2,
    },
  },
};

export { API_URL, MOVIES_URL, SHORTMOVIES_DURATION, DEVICE_PARAMS };

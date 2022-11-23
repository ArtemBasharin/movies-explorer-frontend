export const MOVIES_URL = "https://api.nomoreparties.co/beatfilm-movies";

class MoviesApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  async _requestResult(res) {
    const result = await res.json();
    return res.ok ? result : Promise.reject(res);
  }

  getMovies() {
    const allMoviesLS = localStorage.getItem('ALL_MOVIES_LS_KEY')

    if (allMoviesLS) return Promise.resolve(JSON.parse(allMoviesLS))

    return fetch(`${this._baseUrl}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then(res => this._requestResult(res))
      .then(movies => {
        localStorage.setItem('ALL_MOVIES_LS_KEY', JSON.stringify(movies))

        return movies
      });
  }
}

const moviesApi = new MoviesApi({
  baseUrl: MOVIES_URL,
});

export default moviesApi;

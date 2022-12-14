import { JWT_LS_KEY, SAVED_MOVIES_LS_KEY, saveMoviesToLS } from "../utils/constants";

export const API_URL = "https://api.movex.nomoredomains.sbs";

class Api {
  _onUnauthorized = null

  constructor({ apiUrl }) {
    this._apiUrl = apiUrl;
  }

  setOnUnauthorizedHandler(signOut) {
    this._onUnauthorized = signOut
  }

  async _requestResult(res) {
    if (typeof res === 'string') return Promise.reject(res);
    if (res instanceof Error) return Promise.reject(res.message);
    if (res.status === 401 && this._onUnauthorized) this._onUnauthorized()

    const result = await res.json();
    return res.ok ? result : Promise.reject(result.message);
  }

  getAuthHeader() {
    const jwt = localStorage.getItem(JWT_LS_KEY)

    return jwt === null ? {} : {
      Authorization: `Bearer ${jwt}`,
    }
  }

  makeRequest(path, options) {
    let requestParams = {
      headers: {
        ...this.getAuthHeader(),
      }
    }

    if (options) {
      requestParams = {
        ...options,
        ...requestParams,
      }

      if (options.body) requestParams.body = JSON.stringify(options.body)

      if (options.headers) {
        requestParams.headers = {
          ...requestParams.headers,
          ...options.headers,
        }
      }
    }

    return fetch(path, requestParams)
      .then(res => this._requestResult(res))
      .catch(res => this._requestResult(res));
  }

  createUser(name, email, password) {
    return this.makeRequest(`${this._apiUrl}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: {
        name,
        email,
        password,
      },
    });
  }

  login(email, password) {
    return this.makeRequest(`${this._apiUrl}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { email, password },
    });
  }

  getUserInfo() {
    return this.makeRequest(`${this._apiUrl}/users/me`);
  }

  updateUser(name, email) {
    return this.makeRequest(`${this._apiUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: { name, email },
    });
  }

  getSavedMovies() {
    const savedMovies = localStorage.getItem(SAVED_MOVIES_LS_KEY)

    if (savedMovies) return Promise.resolve(JSON.parse(savedMovies))

    return this.makeRequest(`${this._apiUrl}/movies`)
      .then(movies => {
        saveMoviesToLS(movies);

        return movies
      });
  }

  addNewMovie(data) {
    const { id, created_at, updated_at, ...body } = { ...data, movieId: data.id }

    return this.makeRequest(`${this._apiUrl}/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
  }

  deleteMovie(data) {
    return this.makeRequest(`${this._apiUrl}/movies/${data}`, {
      method: "DELETE",
    });
  }
}

const mainApi = new Api({
  apiUrl: API_URL,
});

export default mainApi;

export const API_URL = "https://api.movex.nomoredomains.sbs";

class Api {
  constructor({ apiUrl }) {
    this._apiUrl = apiUrl;
  }

  async _requestResult(res) {
    const result = await res.json();
    return res.ok ? result : Promise.reject(result.message);
  }

  getAuthHeader() {
    const jwt = localStorage.getItem("jwt")

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
      }

      if (options.body) requestParams.body = JSON.stringify(options.body)

      if (options.headers) {
        requestParams.headers = {
          ...requestParams.headers,
          ...options.headers,
        }
      }
    }

    return fetch(path, requestParams).then((res) => this._requestResult(res));
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
    return this.makeRequest(`${this._apiUrl}/movies`);
  }

  addNewMovie(data) {
    return this.makeRequest(`${this._apiUrl}/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: { ...data, movieId: data.id },
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

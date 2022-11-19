import "./App.css";
import mainApi from "../../api/MainApi.js";
import { CurrentUserContext, LoaderContext, MoviesContext, PopupContext, SavedMoviesContext } from "../../contexts";
import { useState, useEffect } from "react";
import {
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";
import Header, { headerEndpoints } from "../Header/Header";
import Main from "../Main/Main";
import Footer, { footerEndpoints } from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import Loader from "../Loader/Loader";
import Popup from "../Popup/Popup";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import moviesApi from "../../api/MoviesApi";
import { JWT_LS_KEY } from "../../utils/constants";
import { setMoviesDefaults } from "../../utils";

function App() {
  const history = useHistory();
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  const [popup, setPopup] = useState({
    isOpen: false,
    successful: true,
    text: "",
  });

  function handleLogin({ email, password }) {
    setIsLoaderVisible(true);

    mainApi
      .login(email, password)
      .then(({ token }) => {
        localStorage.setItem(JWT_LS_KEY, token);

        mainApi
          .getUserInfo()
          .then((res) => {
            setCurrentUser(res)
            history.push("/movies")

            setPopup({
              isOpen: true,
              successful: true,
              text: "Добро пожаловать!",
            });

            setIsLoaderVisible(false)
          })
          .catch(err => { throw err })
      })
      .catch((err) => {
        setPopup({
          isOpen: true,
          successful: false,
          text: err,
        })

        setIsLoaderVisible(false)
      })
  }

  useEffect(() => {
    const jwt = localStorage.getItem(JWT_LS_KEY);

    if (jwt) {
      mainApi
        .getUserInfo()
        .then(user => {
          setCurrentUser(user);
        })
        .catch((err) =>
          setPopup({
            isOpen: true,
            successful: false,
            text: err,
          })
        )
        .finally(() => {
          setIsAuthChecking(false);
        });
    } else {
      setIsAuthChecking(false);
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      setIsLoaderVisible(true)

      Promise.all([
        moviesApi.getMovies(),
        mainApi.getSavedMovies(),
      ]).then(([allMovies, userSavedMovies]) => {
        setMovies(setMoviesDefaults(allMovies))
        setSavedMovies(userSavedMovies)
      }).catch(err => {
        setPopup({
          isOpen: true,
          successful: false,
          text: err,
        })
      }).finally(() => setIsLoaderVisible(false));
    }
  }, [currentUser]);

  return (
    <LoaderContext.Provider value={{ isLoaderVisible, setIsLoaderVisible }}>
      <PopupContext.Provider value={{ popup, setPopup }}>
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
          <MoviesContext.Provider value={{ movies }}>
            <SavedMoviesContext.Provider value={{ savedMovies, setSavedMovies }}>
              <div className="app">
                {isAuthChecking ? <Loader /> : (
                  <>
                    {isLoaderVisible && <Loader />}
                    <Popup />

                    <Route exact path={headerEndpoints}>
                      <Header />
                    </Route>

                    <Switch>
                      <Route exact path="/">
                        <Main />
                      </Route>

                      <Route exact path="/signup">
                        {currentUser ? <Redirect to="/" /> : <Register handleLogin={handleLogin} />}
                      </Route>

                      <Route exact path="/signin">
                        {currentUser ? <Redirect to="/" /> : <Login handleLogin={handleLogin} />}
                      </Route>

                      <ProtectedRoute
                        path="/movies"
                        component={Movies}
                      />

                      <ProtectedRoute
                        path="/saved-movies"
                        component={SavedMovies}
                      />

                      <ProtectedRoute
                        path="/profile"
                        component={Profile}
                      />

                      <Route path="*">
                        <NotFound />
                      </Route>
                    </Switch>

                    <Route exact path={footerEndpoints}>
                      <Footer />
                    </Route>
                  </>
                )}
              </div>
            </SavedMoviesContext.Provider>
          </MoviesContext.Provider>
        </CurrentUserContext.Provider>
      </PopupContext.Provider>
    </LoaderContext.Provider>
  );
}

export default App

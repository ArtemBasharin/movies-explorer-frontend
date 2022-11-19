import "./App.css";
import mainApi from "../../api/MainApi.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import LoaderContext from "../../contexts/LoaderContext.jsx";

import { useState, useEffect } from "react";
import {
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";
import Header, { headerEndpoints } from "../Header/Header";
import Main from "../Main/Main.jsx";
import Footer, { footerEndpoints } from "../Footer/Footer.jsx";
import Movies from "../Movies/Movies.jsx";
import SavedMovies from "../SavedMovies/SavedMovies.jsx";
import Register from "../Register/Register.jsx";
import Login from "../Login/Login.jsx";
import Profile from "../Profile/Profile.jsx";
import NotFound from "../NotFound/NotFound.jsx";
import Loader from "../Loader/Loader.jsx";
import Popup from "../Popup/Popup.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import PopupContext from "../../contexts/PopupContext";
import SavedMoviesContext from "../../contexts/SavedMoviesContext";

function App() {
  const history = useHistory();
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
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
        localStorage.setItem("jwt", token);

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
    const jwt = localStorage.getItem("jwt");

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

      mainApi
        .getSavedMovies()
        .then(data => {
          setSavedMovies(data.filter(m => m.owner === currentUser._id));
        })
        .catch(err => {
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
        </CurrentUserContext.Provider>
      </PopupContext.Provider>
    </LoaderContext.Provider>
  );
}

export default App

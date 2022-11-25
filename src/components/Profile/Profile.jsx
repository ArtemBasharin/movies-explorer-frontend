import "./Profile.css";
import { useEffect, useContext } from "react";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import mainApi from "../../api/MainApi";
import { CurrentUserContext, LoaderContext, PopupContext } from "../../contexts";

export default function Profile() {
  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();
  const { currentUser, setCurrentUser, signOut } = useContext(CurrentUserContext);
  const { setIsLoaderVisible } = useContext(LoaderContext)
  const { setPopup } = useContext(PopupContext)

  function handleProfile({ name, email }) {
    setIsLoaderVisible(true);

    mainApi
      .updateUser(name, email)
      .then((newUserData) => {
        setCurrentUser(newUserData);

        setPopup({
          isOpen: true,
          successful: true,
          text: "Ваши данные обновлены!",
        });
      })
      .catch((err) =>
        setPopup({
          isOpen: true,
          successful: false,
          text: err,
        })
      )
      .finally(() => setIsLoaderVisible(false));
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleProfile(values);
  }

  useEffect(() => {
    if (currentUser) resetForm(currentUser, {}, true);
  }, [currentUser, resetForm]);

  const requirementValidity = !isValid || (currentUser.name === values.name && currentUser.email === values.email);

  return (
    <main className="profile">
      <form
        className="profile__form"
        name="profile"
        noValidate
        onSubmit={handleSubmit}
      >
        <h1 className="profile__title">
          Привет, {currentUser.name || ""}!
        </h1>

        <div className="profile__labels-container">
          <label className="profile__label">
            <span className="profile__label-text">Имя</span>
            <input
              name="name"
              className={`profile__input ${
                errors.name && "profile__input_error"
              }`}
              onChange={handleChange}
              value={values.name || ""}
              type="text"
              required
              minLength="2"
              maxLength="30"
              pattern="^[A-Za-zА-Яа-яЁё /s -]+$"
            />
            <span className="profile__error-name">{errors.name || ""}</span>
          </label>

          <label className="profile__label">
            <span className="profile__label-text">E-mail</span>
            <input
              name="email"
              className={`profile__input ${errors.email && 'profile__input_error'}`}
              onChange={handleChange}
              value={values.email || ""}
              type="email"
              required
            />
            <span className="profile__error">{errors.email || ""}</span>
          </label>
        </div>

        <div className="profile__button-container">
          <button
            type="submit"
            className={`profile__button-edit ${
              requirementValidity ? 'profile__button-edit_disabled' : ''
            }`}
            disabled={requirementValidity ? true : false}
          >
            Редактировать
          </button>

          <button
            className="profile__button-exit"
            onClick={signOut}
          >
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </main>
  );
}

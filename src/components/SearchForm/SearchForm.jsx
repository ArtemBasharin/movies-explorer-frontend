import "./SearchForm.css";
import { useState, useEffect } from "react";
import ShortMoviesFilter from "../ShortMoviesFilter/ShortMoviesFilter";
import useFormWithValidation from "../../hooks/useFormWithValidation";

export default function SearchForm({
  onSearchSubmit,
  onShortMoviesFilterChange,
  userQuery,
  shortMoviesMode,
}) {
  const inputName = "search";
  const { values, handleChange, isValid } = useFormWithValidation({
    initialValues: { [inputName]: userQuery },
  });
  const [errorQuery, setErrorQuery] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    isValid
      ? onSearchSubmit(values[inputName])
      : setErrorQuery("Нужно ввести ключевое слово");
  }

  useEffect(() => {
    if (errorQuery !== "" && isValid) setErrorQuery("");
  }, [errorQuery, isValid]);

  return (
    <section className="search">
      <form
        className="search__form"
        name="search"
        noValidate
        onSubmit={handleSubmit}
      >
        <input
          className="search__input"
          name={inputName}
          type="text"
          placeholder="Фильм"
          autoComplete="off"
          value={values.search || ""}
          onChange={handleChange}
          required
        />
        <span className="search__error">{errorQuery}</span>
        <button className="search__button" type="submit" />
      </form>

      <ShortMoviesFilter
        shortMoviesMode={shortMoviesMode}
        onFilterChange={onShortMoviesFilterChange}
      />
    </section>
  );
}

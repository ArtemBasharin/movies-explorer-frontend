import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.jsx";
import searchIcon from "../../images/search-icon.svg";

export default function SearchForm() {
  return (
    <section className="search">
      <div className="search__icon">
       <img style={{width: "15px", height: "15px"}} src={searchIcon} alt="Поиск иконка" />
      </div>
      <form className="search__form" name="search">
        <input
          className="search__input"
          name="search"
          type="text"
          placeholder="Фильм"
          required
        />
      <button className="search__button" type="submit"></button>
      </form>


      <FilterCheckbox />
    </section>
  );
}

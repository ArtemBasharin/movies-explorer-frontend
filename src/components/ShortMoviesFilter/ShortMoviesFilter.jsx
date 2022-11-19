import './ShortMoviesFilter.css';

export default function ShortMoviesFilter({ shortMoviesMode, onFilterChange }) {
  return (
    <label className="filter">
      <input
        className="filter__checkbox"
        type="checkbox"
        onChange={onFilterChange}
        checked={shortMoviesMode ? true : false}
      />
      <span className="filter__tumbler"/>
      <span className="filter__text">Короткометражки</span>
    </label>
  );
}

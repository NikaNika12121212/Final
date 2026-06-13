import { useState } from "react";
import styles from "./SearchBar.module.css";

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.663 11.249a7.5 7.5 0 1 0-1.414 1.414l3.089 3.09a1 1 0 0 0 1.414-1.415l-3.09-3.089zm-5.163.751a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function SearchBar({ onSearch }) {
  const [value, setValue]   = useState("");
  const [touched, setTouched] = useState(false);

  const isEmpty = touched && value.trim() === "";

  const handleSubmit = () => {
    setTouched(true);
    if (value.trim()) {
      onSearch(value.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    if (touched && e.target.value.trim()) setTouched(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchField}>
        <input
          className={`${styles.input} ${isEmpty ? styles.inputError : ""}`}
          type="text"
          value={value}
          placeholder="Search for any word..."
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          aria-label="Search for a word"
          aria-describedby={isEmpty ? "search-error" : undefined}
        />
        <button
          type="button"
          className={styles.searchIconButton}
          onClick={handleSubmit}
          aria-label="Search"
        >
          <SearchIcon />
        </button>
      </div>
      {isEmpty && (
        <p id="search-error" className={styles.errorText} role="alert">
          Whoops, can't be empty...
        </p>
      )}
    </div>
  );
}
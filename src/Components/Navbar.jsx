import { useState, useRef, useEffect } from "react";
import styles from "./Navbar.module.css";
import { FONTS } from "../Hooks/useTheme";
import MoonIcon from "../assets/Moon.png";
import bookIconImg from "../assets/iconoir_book.png";

function Toggle({ checked, onChange }) {
  return (
    <label className={styles.toggle} aria-label="Toggle dark mode">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className={styles.toggleTrack} />
      <span className={styles.toggleThumb} />
    </label>
  );
}

export default function Navbar({ dark, onDarkToggle, fontKey, onFontChange }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleDropdown = () => {
    setDropdownOpen((current) => !current);
  };

  const handleFontSelect = (key) => {
    onFontChange(key);
    setDropdownOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src={bookIconImg} alt="Dictionary" className={styles.bookIcon} />
      </div>

      <div className={styles.navRight}>
        <div className={styles.fontDropdown} ref={dropdownRef}>
          <button
            type="button"
            className={`${styles.fontToggle} ${dropdownOpen ? styles.open : ""}`}
            onClick={handleToggleDropdown}
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen}
          >
            <span>{FONTS[fontKey].label}</span>
          </button>

          {dropdownOpen && (
            <ul className={styles.fontOptions} role="listbox">
              {Object.entries(FONTS).map(([key, { label }]) => (
                <li
                  key={key}
                  role="option"
                  aria-selected={fontKey === key}
                  className={`${styles.fontOption} ${fontKey === key ? styles.fontOptionSelected : ""}`}
                  onClick={() => handleFontSelect(key)}
                >
                  {label}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.divider} />

        <div className={styles.modeControls}>
          <Toggle checked={dark} onChange={onDarkToggle} />
          <img src={MoonIcon} alt="Dark mode" className={styles.modeIcon} />
        </div>
      </div>
    </nav>
  );
}
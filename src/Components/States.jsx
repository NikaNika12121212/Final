import styles from "./States.module.css";

export function Spinner() {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner} aria-hidden="true" />
      <p>Loading...</p>
    </div>
  );
}

export function EmptyHint() {
  return (
    <div className={styles.hintBox}>
      <h2 className={styles.hintTitle}>Search for a word</h2>
      <p className={styles.hintText}>
        Start by entering any word above to see instant definitions, examples, and synonyms.
      </p>
    </div>
  );
}

export function NotFound() {
  return (
    <div className={styles.errorBox}>
      <h2 className={styles.errorTitle}>No results found</h2>
      <p className={styles.errorText}>
        We couldn't find that word. Try checking the spelling or searching a different term.
      </p>
    </div>
  );
}
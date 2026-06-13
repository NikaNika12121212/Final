import "./Styles/global.css";
import styles from "./App.module.css";
import { useTheme }      from "./Hooks/useTheme";
import { useDictionary } from "./Hooks/useDictionary";
import Navbar     from "./Components/Navbar";
import SearchBar  from "./Components/SearchBar";
import WordResult from "./Components/WordResult";
import { Spinner, EmptyHint, NotFound } from "./Components/States";

export default function App() {
  const { dark, toggleDark, fontKey, setFontKey } = useTheme();
  const { status, data, search } = useDictionary();

  return (
    <div className={styles.page}>
      <main className={styles.container}>
        <Navbar
          dark={dark}
          onDarkToggle={toggleDark}
          fontKey={fontKey}
          onFontChange={setFontKey}
        />

        <SearchBar onSearch={search} />

        {status === "idle"    && <EmptyHint />}
        {status === "loading" && <Spinner />}
        {status === "error"   && <NotFound />}
        {status === "found" && data && (
          <WordResult data={data} onWordClick={search} />
        )}
      </main>
    </div>
  );
}
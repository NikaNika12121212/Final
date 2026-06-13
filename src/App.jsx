import "./styles/global.css";
import styles from "./App.module.css";
import { useTheme }      from "./hooks/useTheme";
import { useDictionary } from "./hooks/useDictionary";
import Navbar     from "./components/Navbar";
import SearchBar  from "./components/SearchBar";
import WordResult from "./components/WordResult";
import { Spinner, EmptyHint, NotFound } from "./components/States";

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
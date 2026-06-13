import { useState } from "react";
import styles from "./WordResult.module.css";

function PlayButton({ url }) {
  const [hovered, setHovered] = useState(false);

  if (!url) return null;

  return (
    <button
      className={`${styles.playBtn} ${hovered ? styles.playBtnHover : ""}`}
      onClick={() => new Audio(url).play().catch(() => {})}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Play pronunciation"
    >
      <svg width="21" height="21" viewBox="0 0 21 21" fill="none" aria-hidden="true">
        <polygon
          points="5,2 19,10.5 5,19"
          fill={hovered ? "#ffffff" : "#a445ed"}
        />
      </svg>
    </button>
  );
}

function WordHeader({ word, phonetic, audioUrl }) {
  return (
    <div className={styles.wordHeader}>
      <div>
        <h1 className={styles.wordTitle}>{word}</h1>
        {phonetic && <p className={styles.phonetic}>{phonetic}</p>}
      </div>
      <PlayButton url={audioUrl} />
    </div>
  );
}

function Chips({ label, words, variant, onWordClick }) {
  if (!words || words.length === 0) return null;

  return (
    <div className={styles.synRow}>
      <span className={styles.synLabel}>{label}</span>
      <div className={styles.synChips}>
        {words.slice(0, 8).map((w) => (
          <button
            key={w}
            className={`${styles.synChip} ${variant === "antonym" ? styles.synChipAnt : ""}`}
            onClick={() => onWordClick(w)}
          >
            {w}
          </button>
        ))}
      </div>
    </div>
  );
}

function Definition({ definition, example }) {
  return (
    <li className={styles.defItem}>
      <span className={styles.defBullet} aria-hidden="true" />
      {definition}
      {example && <p className={styles.example}>"{example}"</p>}
    </li>
  );
}

function MeaningSection({ meaning, onWordClick }) {
  return (
    <section className={styles.meaningSection}>
      <div className={styles.posRow}>
        <span className={styles.posWord}>{meaning.partOfSpeech}</span>
        <div className={styles.posLine} />
      </div>

      <p className={styles.meaningLabel}>Meaning</p>

      <ul className={styles.defList} aria-label={`${meaning.partOfSpeech} definitions`}>
        {meaning.definitions.map((d, i) => (
          <Definition
            key={i}
            definition={d.definition}
            example={d.example}
          />
        ))}
      </ul>

      <Chips
        label="Synonyms"
        words={meaning.synonyms}
        variant="synonym"
        onWordClick={onWordClick}
      />
      <Chips
        label="Antonyms"
        words={meaning.antonyms}
        variant="antonym"
        onWordClick={onWordClick}
      />
    </section>
  );
}

function SourceLink({ url }) {
  if (!url) return null;

  return (
    <div className={styles.sourceBox}>
      <span className={styles.sourceLabel}>Source</span>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.sourceLink}
      >
        {url}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path
            d="M6 2H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V8M8 1h5m0 0v5m0-5L6 8"
            stroke="#757575"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </div>
  );
}

export default function WordResult({ data, onWordClick }) {
  const audioUrl =
    data.phonetics?.find((p) => p.audio && p.audio !== "")?.audio || "";

  return (
    <article className={styles.container}>
      <WordHeader
        word={data.word}
        phonetic={data.phonetic}
        audioUrl={audioUrl}
      />

      {(data.meanings || []).map((meaning, i) => (
        <MeaningSection
          key={i}
          meaning={meaning}
          onWordClick={onWordClick}
        />
      ))}

      <SourceLink url={data.sourceUrls?.[0]} />
    </article>
  );
}
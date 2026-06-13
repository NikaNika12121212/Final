import { useState, useCallback } from "react";

const API_BASE = "https://api.dictionaryapi.dev/api/v2/entries/en/";

export function useDictionary() {
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "found" | "error"
  const [data, setData]     = useState(null);
  const [word, setWord]     = useState("");

  const search = useCallback(async (query) => {
    if (!query.trim()) return;
    setWord(query.trim());
    setStatus("loading");
    setData(null);

    try {
      const res  = await fetch(API_BASE + encodeURIComponent(query.trim()));
      const json = await res.json();

      if (!Array.isArray(json)) {
        setStatus("error");
        return;
      }

      setData(json[0]);
      setStatus("found");
    } catch {
      setStatus("error");
    }
  }, []);

  return { status, data, word, search };
}
import { useState, useEffect, useCallback } from "react";

export const FONTS = {
  sans: { label: "Sans Serif", fontFamily: "Inter, sans-serif" },
  serif: { label: "Serif", fontFamily: "Lora, serif" },
  mono: { label: "Mono", fontFamily: "Inconsolata, monospace" },
};

export function useTheme() {
  const [dark, setDark] = useState(false);
  const [fontKey, setFontKey] = useState("sans");

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  useEffect(() => {
    document.documentElement.style.fontFamily = FONTS[fontKey]?.fontFamily || FONTS.inter.fontFamily;
  }, [fontKey]);

  const toggleDark = useCallback(() => {
    setDark((current) => !current);
  }, []);

  return { dark, toggleDark, fontKey, setFontKey };
}
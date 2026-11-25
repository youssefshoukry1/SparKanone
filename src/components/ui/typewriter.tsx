"use client";

import { useEffect, useState } from "react";

interface TypewriterProps {
  words: readonly string[];
  speed?: number;
  delayBetweenWords?: number;
  cursor?: boolean;
  cursorChar?: string;
}

export function Typewriter({
  words,
  speed = 75,
  delayBetweenWords = 2000,
  cursor = true,
  cursorChar = "|",
}: TypewriterProps) {
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const word = words[index % words.length] ?? "";

  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: no-preference)");
    const update = () => setEnabled(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled || !word) return;

    const delay = deleting ? speed / 2 : length < word.length ? speed : delayBetweenWords;
    const timer = window.setTimeout(() => {
      if (!deleting && length === word.length) setDeleting(true);
      else if (deleting && length === 0) {
        setDeleting(false);
        setIndex(current => (current + 1) % words.length);
      } else setLength(current => current + (deleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [delayBetweenWords, deleting, enabled, length, speed, word, words.length]);

  return (
    <span className="typewriter">
      <span className="sr-only">{words.join(" · ")}</span>
      {words.map((phrase, i) => (
        <span key={i} className="typewriter-size" aria-hidden="true">{phrase}{cursor ? cursorChar : ""}</span>
      ))}
      <span aria-hidden="true">
        {enabled ? word.slice(0, length) : words[0]}
        {enabled && cursor && <span className="typewriter-cursor">{cursorChar}</span>}
      </span>
    </span>
  );
}

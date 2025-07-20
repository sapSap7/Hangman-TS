import React, { useState } from "react";

interface HintProps {
  wordToGuess: string;
  guessLetters: string[];
  onReveal: (letter: string) => void;
  disabled?: boolean;
}

export default function Hint({
  wordToGuess,
  guessLetters,
  onReveal,
  disabled,
}: HintProps) {
  const [revealedLetter, setRevealedLetter] = useState<string | null>(null);
  const [used, setUsed] = useState(false);

  const handleHintClick = () => {
    if (used || disabled) return;
    // Find a letter in wordToGuess that hasn't been guessed yet
    const unrevealed = wordToGuess
      .split("")
      .filter((l) => !guessLetters.includes(l));
    if (unrevealed.length === 0) return;
    const letter = unrevealed[Math.floor(Math.random() * unrevealed.length)];
    setRevealedLetter(letter);
    setUsed(true);
    onReveal(letter);
  };

  return (
    <button
      onClick={handleHintClick}
      disabled={used || disabled}
      style={{
        padding: "8px 16px",
        background: used ? "#eee" : "#f9c74f",
        color: "#222",
        border: "1px solid #ccc",
        borderRadius: "6px",
        cursor: used || disabled ? "not-allowed" : "pointer",
        margin: "8px",
      }}
    >
      {used && revealedLetter ? "Hint" : "Hint"}
    </button>
  );
}

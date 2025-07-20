import { useState, useEffect } from "react";
import Keyboard from "./Keyboard";
import Guess from "./Guess";
import words from "../words.json";
import DrawMan from "./DrawMan";
import { toast, Toaster } from "react-hot-toast";
import restart from "../assets/restart.png";
import Hint from "./Hint";
import "./GamePage.css";

export default function GamePage() {
  const [wordToGuess] = useState<string>(() => {
    return words[Math.floor(Math.random() * words.length)];
  });

  const [guessLetters, setGuessLetters] = useState<string[]>([]);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const activeLetters = guessLetters.filter((letter) =>
    wordToGuess.includes(letter)
  );

  const inactiveLetters = guessLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const incorrectGuesses = guessLetters.filter((l) => !wordToGuess.includes(l));

  const isWordGuessed = wordToGuess
    .split("")
    .every((letter) => guessLetters.includes(letter));

  useEffect(() => {
    if (isGameOver) {
      if (isWordGuessed && incorrectGuesses.length < 5) {
        toast.success("You got it");
      } else {
        toast.error("better luck next time");
      }
    }
  }, [isGameOver, isWordGuessed, incorrectGuesses.length]);

  function addGuessedLetter(letter: string) {
    if (guessLetters.includes(letter) || isGameOver) return;
    setGuessLetters((currentLetters) => [...currentLetters, letter]);
  }

  useEffect(() => {
    const incorrectGuesses = guessLetters.filter(
      (l) => !wordToGuess.includes(l)
    );

    const wordIsGuessed = wordToGuess
      .split("")
      .every((letter) => letter === " " || guessLetters.includes(letter));

    if (incorrectGuesses.length >= 6 || wordIsGuessed) {
      setIsGameOver(true);
    }
  }, [guessLetters, wordToGuess]);

  return (
    <div className="bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-100 via-indigo-100 to-purple-200 h-screen">
      <div className="font-adlam max-w-3xl flex items-center flex-col gap-8 mx-auto pt-12">
        <Toaster></Toaster>
        <Guess
          guessLetters={guessLetters}
          wordToGuess={wordToGuess}
          result={isGameOver}
        />

        <DrawMan numberOfGuesses={incorrectGuesses.length} />

        <Keyboard
          activeLetters={activeLetters}
          inactiveLetters={inactiveLetters}
          addGuessedLetter={addGuessedLetter}
          disabled={isGameOver}
        />
        <Hint
          wordToGuess={wordToGuess}
          guessLetters={guessLetters}
          onReveal={(letter) => addGuessedLetter(letter)}
          disabled={isGameOver || guessLetters.length >= 6}
        />
        <button
          onClick={() => window.location.reload()}
          className="restart-button"
        >
          <img src={restart} alt="restart" className="restart-icon" />
        </button>
      </div>
    </div>
  );
}

import "./Keyboard.css";

interface KeyboardProps {
  activeLetters: string[];
  inactiveLetters: string[];
  addGuessedLetter: (letter: string) => void;
  disabled: boolean;
}

export default function Keyboard({
  activeLetters,
  inactiveLetters,
  addGuessedLetter,
  disabled,
}: KeyboardProps) {
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");

  return (
    <div className="keyboard-container">
      {letters.map((letter) => {
        const isActive = activeLetters.includes(letter);
        const isInactive = inactiveLetters.includes(letter);
        const isDisabled = isActive || isInactive || disabled;

        return (
          <button
            key={letter}
            className="keyboard-button"
            onClick={() => addGuessedLetter(letter)}
            disabled={isDisabled}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <h1>Hangman Game</h1>
      <p className="desc">start guessing the word using the letters provided</p>
      <Link to="/game" className="go-to-game-button">
        Start playing
      </Link>
    </div>
  );
}

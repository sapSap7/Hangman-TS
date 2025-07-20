import React from "react";
import "./App.css";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GamePage from "./components/GamePage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" Component={Home}></Route>
          <Route path="/game" Component={GamePage}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

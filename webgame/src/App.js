import React from 'react';
import Home from './components/pages/Home';
import Play from './components/pages/Play';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Board from './components/pages/Board';
import Settings from './components/pages/Settings';
import Game from './components/pages/Game';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play" element={<Play />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/leaderboard" element={<Board />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


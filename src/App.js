import React from 'react';
import './App.css';
import Board from './components/Board';
import Menu from './components/Menu';

function App() {
  return (
    <div className="App">
      <header className="Main">
        <Board />
        <Menu />
      </header>
    </div>
  );
}

export default App;

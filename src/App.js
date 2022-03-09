import React from 'react';
import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import Config from './components/Config';

export default function App() {
  return (

    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <Login />
        <Config />
      </header>
    </div>
  );
}

import React from 'react';
import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import Header from './components/Header';

export default function App() {
  return (

    <div className="App">
      <Header />
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <Login />
      </header>
    </div>
  );
}

import React from 'react';
import logo from './logo.svg';
import Weather from './features/weather/Weather';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Weather />
        <p>Powered by OpenWeather ®</p>
      </header>
    </div>
  );
}

export default App;

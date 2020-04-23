import React from 'react';
import logo from 'logo.svg'; // przy jsconfig.json nie trzeba podawać ścieżek relatywnych
import './App.css';
import {Navigation} from 'components' // korzysta z index.html z katalogu components

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <h2>Przykładowa aplikacja</h2>
        </p>
      </header>
      <body>
        <Navigation/>
      </body>
    </div>
  );
}

export default App;

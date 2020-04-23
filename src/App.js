import React from 'react';
import logo from 'logo.svg'; // przy jsconfig.json nie trzeba podawać ścieżek relatywnych
import 'App.css';
import {Navigation} from 'components' // korzysta z index.html z katalogu components
import {ThemeProvider} from 'styled-components';
import theme from 'utils/theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>

  );  
}

export default App;

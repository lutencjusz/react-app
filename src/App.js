import React from 'react';
import logo from 'logo.svg'; // przy jsconfig.json nie trzeba podawać ścieżek relatywnych
import 'App.css';
import GlobalStyles from 'index.css'
import {Navigation, Wrapper} from 'components' // korzysta z index.html z katalogu components
import {ThemeProvider} from 'styled-components';
import theme from 'utils/theme'
import {BrowserRouter as Router, 
  Switch,
  Route
} from 'react-router-dom';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles/>
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Przykładowa aplikacja</p>
      </header>
        <Router>
          <Navigation items={[
            { content: 'Dom', to: '/'},
            { content: 'Budżet', to: '/budget'},
          ]} RightElement={(
            <div>
              <button>pl</button>
              <button>en</button>
            </div>
          )}/>
          <Wrapper>
            <Switch>
              <Route exact path="/">
                Dom
              </Route>
              <Route path="/budget">
                Budżet
              </Route>
            </Switch>
          </Wrapper>
        </Router>
    </div> 
    </ThemeProvider>

  );  
}

export default App;

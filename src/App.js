import React from 'react';
import logo from 'logo.svg'; // przy jsconfig.json nie trzeba podawać ścieżek relatywnych
import 'App.css';
import {useTranslation} from 'react-i18next';
import GlobalStyles from 'index.css'
import {Navigation, Wrapper} from 'components' // korzysta z index.html z katalogu components
import {ThemeProvider} from 'styled-components';
import theme from 'utils/theme'
import {BrowserRouter as Router, 
  Switch,
  Route
} from 'react-router-dom';


function App() {

  const {t, i18n} = useTranslation();
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
            { content: t('Home'), to: '/'},
            { content: t('Budget'), to: '/budget'},
          ]} RightElement={(
            <div>
              <button onClick={() => i18n.changeLanguage('pl')}>pl</button>
              <button onClick={() => i18n.changeLanguage('en')}>en</button>
              <button onClick={() => i18n.changeLanguage('de')}>de</button>
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

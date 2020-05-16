import React, { Fragment } from 'react'; //Fragment pozwala nie nie wrapowanie dodatkowym div
import logo from 'logo.svg'; // przy jsconfig.json nie trzeba podawać ścieżek relatywnych
import 'App.css';
import { useTranslation } from 'react-i18next';
import GlobalStyles from 'index.css'
import { LoadingIndicator, Navigation, Wrapper, Button, Budget } from 'components' // korzysta z index.html z katalogu components
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure(); // konfiguruje toast

function App() {

  const { t, i18n } = useTranslation();

  return (
    <Fragment>
      <GlobalStyles />
      <div className="App">
        <header className="App-header">
          <React.Suspense fallback={<LoadingIndicator />}>
            <img src={logo} className="App-logo" alt="logo" />
          </React.Suspense>
          <p>{t('Przykładowa aplikacja')}</p>
        </header>
        <Router>
          <Navigation items={[
            { content: 'Home', to: '/' },
            { content: 'Budget', to: '/budget' },
          ]} RightElement={(
            <div>
              <Button variant='Regular' onClick={() => i18n.changeLanguage('pl')}>pl</Button>
              <Button variant='Regular' onClick={() => i18n.changeLanguage('en')}>en</Button>
              <Button variant='Regular' onClick={() => i18n.changeLanguage('de')}>de</Button>
            </div>
          )} />
          <Wrapper>
            <Switch>
              <Route exact path="/">
                Dom
                </Route>
              <Route path="/budget">
                <Budget />
              </Route>
            </Switch>
          </Wrapper>
        </Router>
      </div>
    </Fragment>
  );
}

export default App;

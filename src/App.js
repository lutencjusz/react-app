import React, {Fragment, useEffect} from 'react'; //Fragment pozwala nie nie wrapowanie dodatkowym div
import logo from 'logo.svg'; // przy jsconfig.json nie trzeba podawać ścieżek relatywnych
import 'App.css';
import {useTranslation} from 'react-i18next';
import GlobalStyles from 'index.css'
import {Navigation, Wrapper, Button} from 'components' // korzysta z index.html z katalogu components
import {BrowserRouter as Router, 
  Switch,
  Route
} from 'react-router-dom';

function App({budget, fetchBudget, fetchBudgetedCategories}) {
  useEffect(() => {
    fetchBudget(1);
    fetchBudgetedCategories(1);
  }, [fetchBudget, fetchBudgetedCategories]);
  console.log(budget);
  const {t, i18n} = useTranslation();
  return (
    <Fragment>
      <GlobalStyles/>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>{t('Przykładowa aplikacja')}</p>
        </header>
          <Router>
            <Navigation items={[
              { content: 'Home', to: '/'},
              { content: 'Budget', to: '/budget'},
            ]} RightElement={(
              <div>
                <Button variant='Regular' onClick={() => i18n.changeLanguage('pl')}>pl</Button>
                <Button variant='Regular' onClick={() => i18n.changeLanguage('en')}>en</Button>
                <Button variant='Regular' onClick={() => i18n.changeLanguage('de')}>de</Button>
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
    </Fragment> 
  );  
}

export default App;

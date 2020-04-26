import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import './components/i18n/i18n';
import {LoadingIndicator} from './components'
import {ThemeProvider} from 'styled-components';
import theme from 'utils/theme'
import configureStore from 'components/data/Store';
import {connect} from 'react-redux';
import {fetchBudget, fetchBudgetedCategories} from 'components/data/actions/budget.actions';

const store = configureStore()

const ConnectApp = connect(state =>{
  return {
    budget: state.budget.budget
  }
}, {
  fetchBudget,
  fetchBudgetedCategories
})(App)

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Suspense fallback={<LoadingIndicator/>}>
        <Provider store={store}>
          <ConnectApp/>
        </Provider>
      </Suspense>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


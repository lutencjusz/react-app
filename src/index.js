import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import './components/i18n/i18n';
import { LoadingIndicator } from './components'
import { ThemeProvider } from 'styled-components';
import theme from 'utils/theme'
import configureStore from 'data/Store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactQueryConfigProvider } from 'react-query'; // umożliwa użycie useQuery

const store = configureStore()

const queryConfig = {
  suspense: true,
  retry: 2, // ilość prób powtórzenia na 2
}

ReactDOM.render(
  <div className='body'>
    <React.StrictMode>
      <ReactQueryConfigProvider config={queryConfig}>
        <ThemeProvider theme={theme}>
          <React.Suspense fallback={<LoadingIndicator />}>
            <Provider store={store}>
              <App />
            </Provider>
          </React.Suspense>
        </ThemeProvider>
      </ReactQueryConfigProvider>
    </React.StrictMode>
  </div>,
  document.getElementById('root')
);


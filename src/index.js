import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import './components/i18n/i18n';
import {LoadingIndicator} from './components'
import {ThemeProvider} from 'styled-components';
import theme from 'utils/theme'
import configureStore from 'data/Store';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = configureStore()

ReactDOM.render(
  <div className='body'>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<LoadingIndicator/>}>
          <Provider store={store}>
            <App/>
          </Provider>
        </Suspense>
      </ThemeProvider>
    </React.StrictMode>
  </div>,
  document.getElementById('root')
);


import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './components/i18n/i18n';

React.lazy(()=> import('dotenv').config({
  path: "../config.env"
}))

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<div>Ładowanie...</div>}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);


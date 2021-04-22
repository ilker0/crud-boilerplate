import React from 'react';
import ReactDOM from 'react-dom';
import { store } from 'Shared/Utils';
import { Provider } from 'react-redux';
import './i18n';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
import './main.scss';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

reportWebVitals();

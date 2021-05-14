import React from 'react';
import ReactDOM from 'react-dom';
import { store, defaultLanguage } from 'Shared/Utils';
import { Provider } from 'react-redux';
import './i18n';
import tr from 'antd/lib/locale//tr_TR';
import en from 'antd/lib/locale/en_US';
import { ConfigProvider } from 'antd';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './main.scss';

const currentLang = defaultLanguage();
let lang = en;

if (currentLang === 'tr') {
  lang = tr;
}

ReactDOM.render(
  <ConfigProvider locale={lang}>
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>,
  document.getElementById('root'),
);

reportWebVitals();

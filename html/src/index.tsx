import 'core-js';
import "regenerator-runtime/runtime";

import React from 'react';
import { Provider, } from 'react-redux';
import ReactDOM from 'react-dom';
import { ConfigProvider, } from 'antd';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store/index';

import zh_CN from 'antd/lib/locale/zh_CN';

ReactDOM.render(<Provider store={store} >
  <ConfigProvider locale={zh_CN} >
    <App />
  </ConfigProvider>
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

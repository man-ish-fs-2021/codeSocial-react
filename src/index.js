import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './chat.css';
import App from './components/App';
import { configureStore } from './store';
import { Provider } from 'react-redux';

const store = configureStore();
// console.log('store', store);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById('root')
);

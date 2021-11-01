// To use Cart as Host
import React from 'react';
import ReactDOM from 'react-dom';

import Home from 'applicationHome/HomeRemote';

import App from './app';

ReactDOM.render(
  <>
    <h1>🛒 Cart Host Application</h1>
    <App />
    <h2>Remote Home:</h2>
    <Home />
  </>,
  document.getElementById('root')
)
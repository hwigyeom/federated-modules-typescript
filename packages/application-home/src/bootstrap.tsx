// To use Home as Host
import React from 'react';
import ReactDOM from 'react-dom';

import Cart from 'applicationCart/CartRemote';

import App from './app';

ReactDOM.render(
  <>
    <h1 className="title">🏠 Home Host Application</h1>
    <App />
    <h2 className="remote-title">Remote Home:</h2>
    <Cart
      callback={() => {
        alert('callback called (in Home Host Application)');
      }}
    />
  </>,
  document.getElementById('root')
)
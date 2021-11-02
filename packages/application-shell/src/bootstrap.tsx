import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom';
import App from './app';
import Loading from './loading';

const Home = React.lazy(() => import('applicationHome/HomeRemote'));
const Cart = React.lazy(() => import('applicationCart/CartRemote'));

ReactDOM.render(
  <App>
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path="/cart">
          <Cart
            callback={() => {
              console.log('hi from callback');
            }}
          />
        </Route>
        <Route path="/products">
          <p style={{ padding: '1em' }}>Products - could be driven by a remote as well</p>
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Suspense>
  </App>,
  document.getElementById('root')
);

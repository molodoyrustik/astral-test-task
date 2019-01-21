import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';

import BrowserRouter from 'react-router-dom/BrowserRouter';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';

import history from './history';
import configureStore from './store';
import DevTools from './components/DevTools';
import routes from './routes';

const store = configureStore(window.REDUX_INITIAL_STATE, 'browser', routerMiddleware(history));

class Client extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <ConnectedRouter history={history}>
            { renderRoutes(routes) }
          </ConnectedRouter>
        </BrowserRouter>
      </Provider>
    );
  }
}

ReactDOM.hydrate(<Client/>, document.getElementById('root'));

if (process.env.NODE_ENV !== 'production') {
  ReactDOM.render(<DevTools store={store} />, document.getElementById('dev-tools'));
}

/* eslint react/jsx-max-props-per-line: 0 */

import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';

import WineApp from './components/wine-app';
import { RegionsPage } from './components/regions';
import { WineListPage } from './components/wine-list';
import { WinePage } from './components/wine';
import { NotFound } from './components/not-found';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import app from './reducers';

const store = createStore(app);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={WineApp}>
        <IndexRoute component={RegionsPage} />
        <Route path="regions/:regionId" component={WineListPage} />
        <Route path="regions/:regionId/wines/:wineId" component={WinePage} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('main')
);

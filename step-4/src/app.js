import React from 'react';
import ReactDOM from 'react-dom';

import WineApp from './components/wine-app';
import Regions from './components/regions';
import WineList from './components/wine-list';
import Wine from './components/wine';
import { NotFound } from './components/not-found';

import { Router, Route, hashHistory, IndexRoute } from 'react-router';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={WineApp}>
      <IndexRoute component={Regions} />
      <Route path="regions/:regionId" component={WineList} />
      <Route path="regions/:regionId/wines/:wineId" component={Wine} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
  , document.getElementById('main')
);

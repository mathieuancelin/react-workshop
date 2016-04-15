/* eslint react/jsx-max-props-per-line: 0 */

import 'whatwg-fetch';

import React, { PropTypes } from 'react';

import WineApp from './components/wine-app';
import { RegionsPage } from './components/regions';
import { WineListPage } from './components/wine-list';
import { WinePage } from './components/wine';
import { NotFound } from './components/not-found';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import app from './reducers';
import { setLikes, setComments } from './actions';

// http://redux.js.org/docs/basics/ExampleTodoList.html

const store = createStore(app);

export const App = React.createClass({
  propTypes: {
    history: PropTypes.object, // eslint-disable-line
  },
  componentDidMount() {
    fetch(`/api/likes`)
      .then(r => r.json())
      .then(r => store.dispatch(setLikes(r.count)));

    fetch(`/api/comments`)
      .then(r => r.json())
      .then(r => store.dispatch(setComments(r.count)));
  },
  render() {
    const history = this.props.history || browserHistory;
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={WineApp}>
            <IndexRoute component={RegionsPage} />
            <Route path="regions/:regionId" component={WineListPage} />
            <Route path="regions/:regionId/wines/:wineId" component={WinePage} />
            <Route path="*" component={NotFound} />
          </Route>
        </Router>
      </Provider>
    );
  }
});

import React from 'react-native';
import thunk from 'redux-thunk';

import { Provider } from 'react-redux';
import { app } from './reducers';
import { createStore, applyMiddleware } from 'redux';

import { WineApp } from './components/wine-app';

const store = createStore(app, applyMiddleware(thunk));

export const App = React.createClass({
  render() {
    return (
      <Provider store={store}>
        <WineApp />
      </Provider>
    );
  }
});

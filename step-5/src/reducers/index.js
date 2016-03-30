import { combineReducers } from 'redux';
import counter from './counter';

const app = combineReducers({
  counter
});

export default app;

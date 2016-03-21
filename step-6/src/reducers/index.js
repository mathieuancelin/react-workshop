import { combineReducers } from 'redux';
import comments from './comments';
import likes from './likes';

const app = combineReducers({
  comments,
  likes
});

export default app;

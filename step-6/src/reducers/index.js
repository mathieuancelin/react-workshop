import { combineReducers } from 'redux';
import { comments } from './comments';
import { likes } from './likes';
import { http } from './http';
import { routerReducer } from 'react-router-redux';

export const app = combineReducers({
  comments,
  likes,
  http,
  routing: routerReducer
})

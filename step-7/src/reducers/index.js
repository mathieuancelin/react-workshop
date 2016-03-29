import { combineReducers } from 'redux';
import { comments } from './comments';
import { likes } from './likes';
import { regions } from './regions';
import { wines, currentWine } from './wines';
import { title } from './title';
import { http } from './http';

/**
 * shape of the global state
 * 
 *  {
 *   comments: {
 *     count: 42
 *   },
 *   likes: {
 *     count: 42
 *   },
 *   regions: {
 *     lastUpdated: 0,
 *     data: [...]
 *   },
 *   wines: {
 *     lastUpdated: 0,
 *     data: [...]
 *   },
 *   currentWine: {
 *     wine: {...},
 *     liked: true,
 *     comments: [...],
 *   },
 *   title: 'Bordeaux',
 *   http: {
 *     state: 'LOADING', // LOADED, ERROR
 *     error: '...'
 *   }
 * }
 */

export const app = combineReducers({
  comments,
  likes,
  regions,
  wines,
  currentWine,
  title,
  http
})

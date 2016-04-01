export const wines = (state = {}, action) => {
  switch (action.type) {
    case 'SET_WINES':
      return Object.assign({}, state, { [action.region]: { lastUpdated: Date.now(), data: action.wines }});
    case 'UPDATE_WINES_TIMESTAMP':
      return Object.assign({}, state, Object.assign({}, state[action.region], { lastUpdated: Date.now() }));
    default:
      return state;
  }
}

export const currentWine = (state = { wine: undefined, comments: [], liked: false }, action) => {
  switch (action.type) {
    case 'SET_CURRENT_WINE':
      return Object.assign({}, state, { wine: action.wine, liked: false });
    case 'SET_CURRENT_COMMENTS':
      return Object.assign({}, state, { comments: action.comments });
    case 'SET_CURRENT_LIKED':
      return Object.assign({}, state, { liked: action.liked });
    default:
      return state;
  }
}

export const wines = (state = { data: [], lastUpdated: 0 }, action) => {
  switch (action.type) {
    case 'SET_WINES':
      return Object.assign({}, state, { data: action.wines });
    default:
      return state;
  }
}

export const currentWine = (state = { wine: undefined, comments: [], liked: false }, action) => {
  switch (action.type) {
    case 'SET_CURRENT_WINE':
      return Object.assign({}, state, { wine: action.wine });
    case 'SET_CURRENT_COMMENTS':
      return Object.assign({}, state, { comments: action.comments });
    case 'SET_CURRENT_LIKED':
      return Object.assign({}, state, { liked: action.liked });
    default:
      return state;
  }
}

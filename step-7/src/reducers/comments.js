export const comments = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'ADD_COMMENT':
      return Object.assign({}, state, { count: state.count + action.increment });
    case 'SET_COMMENTS':
      return Object.assign({}, state, { count: action.comments });
    default:
      return state;
  }
}

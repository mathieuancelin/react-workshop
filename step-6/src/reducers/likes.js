export const likes = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'ADD_LIKE':
      return Object.assign({}, state, { count: state.count + action.increment });
    case 'REMOVE_LIKE':
      return Object.assign({}, state, { count: state.count - action.decrement });
    case 'SET_LIKES':
      return Object.assign({}, state, { count: action.likes });
    default:
      return state;
  }
}

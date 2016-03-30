const likes = (state = 0, action) => {
  switch (action.type) {
    case 'ADD_LIKE':
      return state + action.increment;
    case 'REMOVE_LIKE':
      return state - action.decrement;
    case 'SET_LIKES':
      return action.likes;
    default:
      return state;
  }
}

export default likes;

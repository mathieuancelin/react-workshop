const comments = (state = 0, action) => {
  switch (action.type) {
    case 'ADD_COMMENT':
      return state + action.increment;
    case 'SET_COMMENTS':
      return action.comments;
    default:
      return state;
  }
}

export default comments;

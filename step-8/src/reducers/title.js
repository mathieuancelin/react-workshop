export const title = (state = '', action) => {
  switch (action.type) {
    case 'SET_TITLE':
      return action.title;
    default:
      return state;
  }
}

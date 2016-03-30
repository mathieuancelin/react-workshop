const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + action.increment;
    default:
      return state;
  }
}

export default counter;

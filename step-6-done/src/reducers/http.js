export const http = (state = { state: 'LOADED', error: undefined }, action) => {
  switch (action.type) {
    case 'LOADING':
      return Object.assign({}, state, { state: 'LOADING', error: undefined });
    case 'LOADED':
      return Object.assign({}, state, { state: 'LOADED', error: undefined });
    case 'ERROR':
      return Object.assign({}, state, { state: 'ERROR', error: action.error });
    default:
      return state;
  }
}

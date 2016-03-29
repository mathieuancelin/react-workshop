export const regions = (state = { data: [], lastUpdated: 0 }, action) => {
  switch (action.type) {
    case 'SET_REGIONS':
      return Object.assign({}, state, { data: action.regions });
    default:
      return state;
  }
}

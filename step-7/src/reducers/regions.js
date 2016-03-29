export const regions = (state = { data: [], lastUpdated: 0 }, action) => {
  switch (action.type) {
    case 'SET_REGIONS':
      return Object.assign({}, state, { data: action.regions });
    case 'UPDATE_REGIONS_TIMESTAMP':
      return Object.assign({}, state, { lastUpdated: Date.now() });
    default:
      return state;
  }
}

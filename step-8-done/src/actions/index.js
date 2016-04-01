export const apiHost = '127.0.0.1';

export const addLike = () => {
  return {
    type: 'ADD_LIKE',
    increment: 1
  };
}

export const removeLike = () => {
  return {
    type: 'REMOVE_LIKE',
    decrement: 1
  };
}

export const setLikes = (likes) => {
  return {
    type: 'SET_LIKES',
    likes
  };
}

export const addComment = () => {
  return {
    type: 'ADD_COMMENT',
    increment: 1
  };
}

export const setComments = (comments) => {
  return {
    type: 'SET_COMMENTS',
    comments
  };
}

export const setCurrentRegion = (region) => {
  return {
    type: 'SET_CURRENT_REGION',
    region
  };
}

export const setCurrentWine = (wine) => {
  return {
    type: 'SET_CURRENT_WINE',
    wine
  };
}

export const setCurrentComments = (comments) => {
  return {
    type: 'SET_CURRENT_COMMENTS',
    comments
  };
}

export const setCurrentLiked = (liked) => {
  return {
    type: 'SET_CURRENT_LIKED',
    liked
  };
}

export const setRegions = (regions) => {
  return {
    type: 'SET_REGIONS',
    regions
  };
}

export const setTitle = (title) => {
  return {
    type: 'SET_TITLE',
    title
  };
}

export const setWines = (region, wines) => {
  return {
    type: 'SET_WINES',
    region,
    wines
  };
}

export const loading = (what) => {
  return {
    type: 'LOADING',
    what
  };
}

export const loaded = (what) => {
  return {
    type: 'LOADED',
    what
  };
}

export const errorLoading = (error) => {
  return {
    type: 'ERROR',
    error
  };
}

export const updateRegionsTimestamp = () => {
  return {
    type: 'UPDATE_REGIONS_TIMESTAMP'
  };
}

export const updateWinesTimestamp = (region) => {
  return {
    type: 'UPDATE_REGIONS_TIMESTAMP',
    region
  };
}

export function fetchLikesCount() {
  return dispatch => {
    dispatch(loading('Likes count'));
    fetch(`http://${apiHost}:3000/api/likes`)
      .then(r => r.json())
      .then(r => {
        dispatch(setLikes(r.count));
        dispatch(loaded('Likes count'));
      })
      .catch(error => dispatch(errorLoading(`error while fetching like count : ${error.message}`)));
  };
}

export function fetchCommentsCount() {
  return dispatch => {
    dispatch(loading('Comment counts'));
    fetch(`http://${apiHost}:3000/api/comments`)
      .then(r => r.json())
      .then(r => {
        dispatch(setComments(r.count));
        dispatch(loaded('Comment counts'));
      })
      .catch(error => dispatch(errorLoading(`error while fetching comment count : ${error.message}`)));
  };
}

export function fetchRegions() {
  return (dispatch, state) => {
    if (state().regions.lastUpdated + 60000 < Date.now()) { // caches data during 1mn
      dispatch(loading('Regions'));
      fetch(`http://${apiHost}:3000/api/regions`)
        .then(r => r.json())
        .then(data => {
          dispatch(updateRegionsTimestamp());
          dispatch(setRegions(data));
          dispatch(loaded('Regions'));
        })
        .catch(error => dispatch(errorLoading(`error while fetching regions : ${error.message}`)));
    } else {
      dispatch(setRegions(state().regions.data));
    }
  };
}

export function fetchWinesForRegion(regionId) {
  return (dispatch, state) => {
    const lastUpdated = (state().wines[regionId] || { lastUpdated: 0 }).lastUpdated;
    if (lastUpdated + 60000 < Date.now()) { // caches data during 1mn
      dispatch(setCurrentRegion(regionId));
      dispatch(loading(`Wines for region ${regionId}`));
      fetch(`http://${apiHost}:3000/api/wines?region=${regionId}`)
        .then(r => r.json())
        .then(data => {
          dispatch(updateWinesTimestamp(regionId));
          dispatch(setWines(regionId, data));
          dispatch(loaded(`Wines for region ${regionId}`));
        })
        .catch(error => dispatch(errorLoading(`error while fetching wines for ${regionId} : ${error.message}`)));
    } else {
      dispatch(setWines(regionId, state().wines[regionId].data));
    }
  };
}

export function fetchWine(wineId) {
  return dispatch => {
    dispatch(loading(`wine with id ${wineId}`));
    return fetch(`http://${apiHost}:3000/api/wines/${wineId}`)
      .then(r => r.json())
      .then(data => {
        dispatch(setCurrentWine(data));
        dispatch(loaded(`wine with id ${wineId}`));
      })
      .catch(error => dispatch(errorLoading(`error while fetching wine ${wineId} : ${error.message}`)));
  };
}

export function toggleWineLiked() {
  return (dispatch, state) => {
    const currentLike = state().currentWine.liked;
    fetch(`http://${apiHost}:3000/api/wines/${state().currentWine.wine.id}/like`, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          like: !currentLike
        })
      })
      .then(() => {
        dispatch(setCurrentLiked(!currentLike));
        if (currentLike) {
          dispatch(removeLike());
        } else {
          dispatch(addLike());
        }
      })
      .catch(error => dispatch(errorLoading(`error while toggling wine like ${state().currentWine.wine.id} : ${error.message}`)));
  };
}

export function fetchWineLiked() {
  return (dispatch, state) => {
    fetch(`http://${apiHost}:3000/api/wines/${state().currentWine.wine.id}/like`)
      .then(r => r.json())
      .then(data => {
        dispatch(setCurrentLiked(data.like));
      })
      .catch(error => dispatch(errorLoading(`error while toggling wine like ${state().currentWine.wine.id} : ${error.message}`)));
  };
}

export function fetchComments(wineId) {
  return (dispatch, state) => {
    fetch(`http://${apiHost}:3000/api/wines/${wineId}/comments`)
      .then(r => r.json())
      .then(comments => {
        dispatch(setCurrentComments(comments.sort((a, b) => new Date(b.date) - new Date(a.date))));
      })
      .catch(error => dispatch(errorLoading(`error while fetching comments for ${state().currentWine.wine.id} : ${error.message}`)));
  }
}

export function postComment(wineId, comment) {
  return (dispatch, state) => {
    return fetch(`http://${apiHost}:3000/api/wines/${wineId}/comments`, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
      })
      .then(r => r.json())
      .catch(error => dispatch(errorLoading(`error while posting comment for ${state().currentWine.wine.id} : ${error.message}`)));
  };
}

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

export function fetchLikesCount() {
  return dispatch => {
    dispatch(loading());
    fetch(`/api/likes`)
      .then(r => r.json())
      .then(r => {
        dispatch(setLikes(r.count));
        dispatch(loading());
      })
      .catch(error => dispatch(errorLoading(`error while fetching like count : ${error.message}`)));
  };
}

export function fetchCommentsCount() {
  return dispatch => {
    dispatch(loading());
    fetch(`/api/comments`)
      .then(r => r.json())
      .then(r => {
        dispatch(setComments(r.count));
        dispatch(loaded());
      })
      .catch(error => dispatch(errorLoading(`error while fetching comment count : ${error.message}`)));
  };
}

export function fetchRegions() {
  return dispatch => {
    dispatch(loading());
    fetch('/api/regions')
      .then(r => r.json())
      .then(data => {
        dispatch(setRegions(data));
        dispatch(loaded());
      })
      .catch(error => dispatch(errorLoading(`error while fetching regions : ${error.message}`)));
  };
}

export function fetchWinesForRegion(regionId) {
  return dispatch => {
    dispatch(setCurrentRegion(regionId));
    dispatch(loading());
    fetch(`/api/wines?region=${regionId}`)
      .then(r => r.json())
      .then(data => {
        dispatch(setWines(regionId, data));
        dispatch(loaded());
      })
      .catch(error => dispatch(errorLoading(`error while fetching wines for ${regionId} : ${error.message}`)));
  };
}

export function fetchWine(wineId) {
  return dispatch => {
    dispatch(loading());
    return fetch(`/api/wines/${wineId}`)
      .then(r => r.json())
      .then(data => {
        dispatch(setCurrentWine(data));
        dispatch(loaded());
      })
      .catch(error => dispatch(errorLoading(`error while fetching wine ${wineId} : ${error.message}`)));
  };
}

export function toggleWineLiked() {
  return (dispatch, state) => {
    const currentLike = state().currentWine.liked;
    fetch(`http://localhost:3000/api/wines/${state().currentWine.wine.id}/like`, {
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
    fetch(`http://localhost:3000/api/wines/${state().currentWine.wine.id}/like`)
      .then(r => r.json())
      .then(data => {
        setCurrentLiked(data.like);
      })
      .catch(error => dispatch(errorLoading(`error while toggling wine like ${state().currentWine.wine.id} : ${error.message}`)));
  };
}

export function fetchComments(wineId) {
  return (dispatch, state) => {
    fetch(`http://localhost:3000/api/wines/${wineId}/comments`)
      .then(r => r.json())
      .then(comments => {
        dispatch(setCurrentComments(comments.sort((a, b) => new Date(b.date) - new Date(a.date))));
      })
      .catch(error => dispatch(errorLoading(`error while toggling comments for ${state().currentWine.wine.id} : ${error.message}`)));
  }
}

export function postComment(wineId, comment) {
  return (dispatch, state) => {
    fetch(`http://localhost:3000/api/wines/${wineId}/comments`, {
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

export const setWines = (regionId, wines) => {
  return {
    type: 'SET_WINES',
    region: regionId,
    wines
  };
}

export const loading = () => {
  return {
    type: 'LOADING'
  };
}

export const loaded = () => {
  return {
    type: 'LOADED'
  };
}

export const errorLoading = (error) => {
  return {
    type: 'ERROR',
    error
  };
}

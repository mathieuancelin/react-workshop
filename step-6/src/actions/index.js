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

export function fetchLikesCount() {
  return dispatch => {
    dispatch(loading('Likes count'));
    fetch(`/api/likes`)
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
    fetch(`/api/comments`)
      .then(r => r.json())
      .then(r => {
        dispatch(setComments(r.count));
        dispatch(loaded('Comment counts'));
      })
      .catch(error => dispatch(errorLoading(`error while fetching comment count : ${error.message}`)));
  };
}

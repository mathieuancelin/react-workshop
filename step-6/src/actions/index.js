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

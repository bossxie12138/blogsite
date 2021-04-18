import { ADD_LIKE } from '../../actionTypes'

const initialLikes = {
  likes: 0
}

export const likesReducer = (state = initialLikes, action) => {
  if (action.type === ADD_LIKE) {
    return {
      likes: action.data
    }
  } else {
    return state
  }
}
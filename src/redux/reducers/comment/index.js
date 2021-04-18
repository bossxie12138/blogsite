import { ADD_COMMENT, GET_COMMENT } from '../../actionTypes'

const initialComment = {
  commentList: []
}

export const commentReducer = (state = initialComment, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        commentList: action.data
      }
    case GET_COMMENT:
      return {
        commentList: action.data
      }
    default:
      return state
  }
}
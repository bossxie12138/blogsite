import { GET_CLASSIFY } from '../../actionTypes'

const initialClassify = {
  classifyList: []
}

export const classifyReducer = (state = initialClassify, action) => {
  if (action.type===GET_CLASSIFY) {
    return {
      classifyList: action.data
    }
  } else {
    return state
  }
}
import { GET_RECENT } from  '../../actionTypes'

const initialRencent = {
  recentList: []
}

export const recentReducer = (state = initialRencent, action) => {
  if (action.type === GET_RECENT) {
    return {
      recentList: action.data
    }
  } else {
    return state
  }
}
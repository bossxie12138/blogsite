import { GET_MSG } from '../../actionTypes'

const initialMsg = {
  msgs: ''
}

export const msgReducer = (state = initialMsg, action) => {
  if (action.type === GET_MSG) {
    return {
      msgs: action.data
    }
  } else {
    return state
  }
}
import { LOGIN, EXIT, EDIT_USER } from '../../actionTypes'

const initialUser = {
  isLogin: false,
  userInfo: {}
}

export const userReducer = (state = initialUser, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        isLogin: true,
        userInfo: action.data
      }
    case EXIT:
      return {
        isLogin: false,
        userInfo: {}
      }
    case EDIT_USER:
      return {
        isLogin: true,
        userInfo: action.data
      }
    default:
      return state
  }
}
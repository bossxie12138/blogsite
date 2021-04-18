import { GET_COLLECTION } from '../../actionTypes'

const initialCollection = {
  collectionList: []
}

export const collectionReducer = (state = initialCollection, action) => {
  if (action.type===GET_COLLECTION) {
    return {
      collectionList: action.data
    }
  } else {
    return state
  }
}
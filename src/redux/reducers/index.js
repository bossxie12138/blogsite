import { combineReducers } from 'redux'
import { articleReducer } from './article'
import { commentReducer } from './comment'
import { userReducer } from './user'
import { classifyReducer } from './classify'
import { recentReducer } from './recent'
import { collectionReducer } from './collection'
import { msgReducer } from './message'

const rootReducer = combineReducers({
  articleReducer,
  commentReducer,
  userReducer,
  classifyReducer,
  recentReducer,
  collectionReducer,
  msgReducer
})

export default rootReducer
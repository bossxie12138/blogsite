import {
  ADD_LIKE,
  ADD_LOOK,
  FUZZY_SEARCH,
  GETARTICLE_BYID,
  GET_ARTICLE,
  SEARCH_CLASSIFY
} from '../../actionTypes'

const initialArticle = {
  articleList: []
}

export const articleReducer = (state = initialArticle, action) => {
  switch (action.type) {
    case GET_ARTICLE:
      return {
        articleList: action.data
      }
    case GETARTICLE_BYID:
      return {
        articleList: action.data
      }
    case ADD_LIKE:
      return {
        articleList: action.data
      }
    case ADD_LOOK:
      return {
        articleList: action.data
      }
    case FUZZY_SEARCH:
      return {
        articleList: action.data
      }
    case SEARCH_CLASSIFY:
      return {
        articleList: action.data
      }
    default:
      return state
  }
}
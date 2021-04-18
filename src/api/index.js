import {
  getAllArticle,
  classifySearch,
  getClassify,
  getRecent,
  getMessages,
  addMessages,
  addComment,
  fuzzySearch,
  getComment,
  getArticleById,
  addLike,
  addLook
} from './article'
import { addUser, login, editUser  } from './user'
import { getCollection } from './collection'

export {
  getAllArticle,
  addUser,
  login,
  getClassify,
  editUser,
  addComment,
  getComment,
  getArticleById,
  addLike,
  addLook,
  fuzzySearch,
  getRecent,
  getCollection,
  addMessages,
  getMessages,
  classifySearch
}
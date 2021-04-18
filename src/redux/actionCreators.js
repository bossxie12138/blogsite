import {
  GET_ARTICLE,
  LOGIN,
  EDIT_USER,
  ADD_COMMENT,
  GET_COMMENT,
  GETARTICLE_BYID,
  ADD_LIKE,
  ADD_LOOK,
  FUZZY_SEARCH,
  GET_CLASSIFY,
  GET_RECENT,
  GET_COLLECTION,
  GET_MSG,
  SEARCH_CLASSIFY
} from './actionTypes'
import {
  addUser,
  editUser,
  getAllArticle,
  login,
  addComment,
  getComment,
  getArticleById,
  addLike,
  addLook,
  fuzzySearch,
  getClassify,
  getRecent,
  getCollection,
  addMessages,
  getMessages,
  classifySearch
} from '../api'
import jwtDecode from 'jwt-decode'
import jwt from 'jsonwebtoken'
import { message } from 'antd'
import { config } from '../utils'

export const getHomeList = () => {
  return async dispatch => {
    let { data } = await getAllArticle()
    dispatch({ data, type: GET_ARTICLE })
  }
}

export const getArtByIdAction = id => {
  return async dispatch => {
    let { data } = await getArticleById(id)
    dispatch({ data, type: GETARTICLE_BYID })
  }
}

export const addCommetAction = (config, id) => {
  return async dispatch => {
    let { data } = await addComment(config, id)
    let {commentList} = data[0]
    let newDataArr = commentList.split('|')
    let result = newDataArr.map(item => JSON.parse(item))
    dispatch({ data: result, type: ADD_COMMENT })
  }
}

export const getCommentAction = id => {
  return async dispatch => {
    let { data } = await getComment(id)
    let {commentList} = data[0]
    if (commentList!==null) {
      let arr = commentList.split('|')
      let newData = arr.map(item => JSON.parse(item))
      dispatch({ data: newData, type: GET_COMMENT })
    }else {
      dispatch({ data: [], type: GET_COMMENT })
    }
  }
}

export const addUserAction = (config, history) => {
  return async () => {
    let { data } = await addUser(config)
    if (data) {
      message.success('注册成功！将自动跳转登录页')
      setTimeout(() => {
        history.push('/login')
      }, 500);
    } else {
      message.error('用户名已被注册！')
    }
  }
}

export const loginAction = (config) => {
  return async dispatch => {
    let data = await login(config)
    if (data.token) {
      localStorage.setItem('jwtToken', data.token)
      let userInfo = jwtDecode(data.token)
      dispatch({ data: userInfo, type: LOGIN })
      message.success('登录成功！')
    }
    else {
      message.error(data)
    }
  }
}

export const editUserAction = value => {
  return async dispatch => {
    let { data } = await editUser(value)
    const token = jwt.sign({
      id: data[0].id,
      username: data[0].username,
      nickname: data[0].nickname,
      avatar: data[0].avatar,
      email: data[0].email,
      password: data[0].password
    }, config.jwtSecret)
    localStorage.setItem('jwtToken', token)
    dispatch({ data: data[0], type: EDIT_USER })
  }
}

export const addLikeAction = id => {
  return async dispatch => {
    let { data } = await addLike(id)
    dispatch({ data, type: ADD_LIKE })
  }
}

export const addLookAction = id => {
  return async dispatch => {
    let { data } = await addLook(id)
    dispatch({ data, type: ADD_LOOK })
  }
}

export const searchAction = word => {
  return async dispatch => {
    let { data } = await fuzzySearch(word)
    dispatch({ data, type: FUZZY_SEARCH })
  }
}

export const seartchClassifyAction = word => {
  return async dispatch => {
    let { data } = await classifySearch(word)
    dispatch({ data, type: SEARCH_CLASSIFY })
  }
}

export const getClassifyAction = () => {
  return async dispatch => {
    let { data } = await getClassify()
    dispatch({ data, type: GET_CLASSIFY })
  }
}

export const getRecentAction = () => {
  return async dispatch => {
    let { data } = await getRecent()
    dispatch({ data, type: GET_RECENT })
  }
}

export const getCollectionAction = () => {
  return async dispatch => {
    let { data } = await getCollection()
    dispatch({ data, type: GET_COLLECTION })
  }
}

export const addMsgAction = config => {
  return async ()=> {
    let { data } = await addMessages(config)
    if (typeof data==='string') {
      message.success(data)
    }
  }
}

export const getMsgAction = uname => {
  return async dispatch => {
    let { data } = await getMessages(uname)
    if (data === null || data.length === 0) {
      dispatch({type: 'other' })
      return
    }
    dispatch({ data, type: GET_MSG })
  }
}
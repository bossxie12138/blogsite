import axios from '../../utils/http'

export const getAllArticle = () => axios.get('/ui/getHomeList')
export const getArticleById = id => axios.get('/ui/getById', {params:{id}})
export const addComment = (config, id) => axios.post('/ui/addComment', { config, id })
export const getComment = id => axios.get('/ui/getComment', {params:{id}})
export const addLike = id => axios.get('/ui/addLike', {params:{id}})
export const addLook = id => axios.get('/ui/addLook', {params:{id}})
export const fuzzySearch = word => axios.get('/ui/searchUi', {params:{word}})
export const classifySearch = word => axios.get('/ui/searchClassify', {params:{word}})
export const getClassify = () => axios.get('/ui/getClassifyList')
export const getRecent = () => axios.get('/ui/getRecentList')
export const addMessages = config => axios.get('/ui/addMsg', {params:{config}})
export const getMessages = uname => axios.get('/ui/getMsg', {params:{uname}})
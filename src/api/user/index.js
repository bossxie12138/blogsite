import axios from '../../utils/http'

export const addUser = config => axios.post('/ui/addUser', {config })
export const login = config => axios.post('/ui/login', {config })
export const editUser = config => axios.post('/ui/editUser', { config })

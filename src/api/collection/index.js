import axios from '../../utils/http'

export const getCollection = () => axios.get('/ui/getCollection')

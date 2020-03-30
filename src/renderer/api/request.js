import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api'

export const POST = (url, params) => {
  return axios.post(url, params)
}
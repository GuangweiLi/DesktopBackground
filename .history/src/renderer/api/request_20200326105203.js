import axios from 'axios';

axios.defaults.baseURL = '/api'

export const POST = (url, params) => {
  return axios.post(url, params)
}
import axios from 'axios'
import env from '../../config/base.env.js'

const apiHost = env.API_HOST
const apiPath = env.API_PATH

const api = {
  async request(action, endpoint, params) {
    return this[action](endpoint, params)
  },

  async post (endpoint, params) {
    const url = this._constructUrl(endpoint, params)
    return axios.post(url)
  },

  _constructUrl(endpoint, params) {
    if (params) {
      params = this._constructParams(params)
    }

    url = [apiHost, apiPath, endpoint].join('/')
    url = [url, params].join('?')

    return url
  },

  _constructParams (params) {
    return Object.keys(params)
      .map((key) => key + '=' + params[key])
      .join('&')
  }
}

export default api

import axios from 'axios'
import store from '../store'
import env from '../../config/base.env.js'

const apiHost = env.API_HOST
const apiPath = env.API_PATH

const api = {
  get (endpoint, params) {
    const url = this._constructUrl(endpoint, params)
    this._addJWT()
    console.log('GET ' + url)
    return axios.get(url)
  },

  post (endpoint, params, data) {
    const url = this._constructUrl(endpoint, params)
    this._addJWT()
    console.log('POST ' + url)
    return axios({
      method: 'post',
      url: url,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    })
  },

  _constructUrl(endpoint, params) {
    url = [apiHost, apiPath, endpoint].join('/')
    if (params) {
      params = this._constructParams(params)
      url = [url, params].join('?')
    }
    return url
  },

  _constructParams (params) {
    return Object.keys(params)
      .map((key) => key + '=' + params[key])
      .join('&')
  },

  _addJWT (config) {
    if (store.state.jwt) {
      axios.defaults.headers.common['Authorization'] =
        'Bearer ' + store.state.jwt
    }
  }
}

export default api

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

  put (endpoint, params, data) {
    const url = this._constructUrl(endpoint, params)
    this._addJWT()
    console.log('PUT ' + url)
    return axios({
      method: 'put',
      url: url,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    })
  },

  delete (endpoint, params) {
    const url = this._constructUrl(endpoint, params)
    this._addJWT()
    console.log('DELETE ' + url)
    return axios.delete(url)
  },

  _constructUrl(endpoint, params) {
    var path = (endpoint.includes(apiPath)) ? '' : apiPath
    url = [apiHost, path, endpoint].join('/')
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

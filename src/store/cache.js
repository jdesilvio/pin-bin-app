import Vue from 'vue-native-core'
import Vuex from 'vuex'
import createCache from 'vuex-cache'

import api from '../api'
import store from '../store'

Vue.use(Vuex)

const batchSize = 50

const cache = new Vuex.Store({
  plugins: [createCache()],
  actions: {
    'FETCH_YELP': async (_) => {
      var pins
      let currentLocation = store.state.currentLocation
      let params = {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude
      }

      await api.get('yelp', params).then(response => {
        console.log('*** YELP ***')
        let data = response.data.data.yelp
        data = JSON.parse(data)
        let businesses = data.businesses
        pins = businesses.slice(0, batchSize)
      })

      return pins
    }
  }
})

export default cache

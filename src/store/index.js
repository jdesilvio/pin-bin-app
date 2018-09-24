import Vue from 'vue-native-core'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    jwt: null,
    userResource: null,
    currentLocation: null
  },
  mutations: {
    setJWT (state, jwt) {
      state.jwt = jwt
    },
    setUserResource (state, userResource) {
      state.userResource = userResource
    },
    setCurrentLocation (state, location) {
      state.currentLocation = location
    }
  }
})

export default store

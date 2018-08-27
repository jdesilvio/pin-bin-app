import Vue from 'vue-native-core'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    jwt: null
  },
  mutations: {
    setJWT (state, jwt) {
      state.jwt = jwt
    },
    destroyJWT (state) {
      state.jwt = null
    }
  }
})

export default store

import Vue from 'vue-native-core'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    jwt: null,
    userResource: null
  },
  mutations: {
    setJWT (state, jwt) {
      state.jwt = jwt
    },
    setUserResource (state, userResource) {
      state.userResource = userResource
    }
  }
})

export default store

<template>
  <view class="container">
    <text class="title">pin</text>
    <text class="title">bin</text>

    <view :style="{padding: 8, alignItems: 'center', width: '100%'}">
      <text-input
        class="input"
        v-model="emailInput"
        placeholder="email"
      />
      <text-input
        class="input"
        v-model="passwordInput"
        placeholder="password"
      />

      <view :style="{padding: 8, alignItems: 'center', width: '100%'}">
        <btn btn-text="LOG IN" :on-btn-press="handleLogin"></btn>
        <button
          :on-press="goToSignUp"
          title="Don't have an account? Sign up!"
          color="blue"
        />
      </view>
    </view>
  </view>
</template>

<script>
import api from '../api'
import { getJWT, getResource } from '../api/utils'
import store from '../store'
import btn from '../components/Button.vue'

export default {
  props: {
    navigation: {
      type: Object
    }
  },

  data () {
    return {
      emailInput: '',
      passwordInput: ''
    }
  },

  components: {
    btn
  },

  created () {
    console.log(this.navigation)
  },

  methods: {
    async handleLogin () {
      let params = {
        'email': this.emailInput,
        'password': this.passwordInput
      }
      let resp = await api.post('auth', params)
        .then((resp) => resp)
      let jwt = getJWT(resp)
      let userResource = getResource(resp)

      store.commit('setJWT', jwt)
      store.commit('setUserResource', userResource)

      if (store.state.jwt && store.state.userResource) {
        this.navigation.navigate('Home')
      } else {
        alert('An error occurred while logging in.')
      }
    },
    goToSignUp () {
      this.navigation.navigate('SignUp')
    }
  }
}
</script>

<style>
.container {
  background-color: lightblue;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  flex-direction: column;
}
.title {
  color: blue;
  font-size: 32;
}
.input {
  height: 40;
  width: 90%;
  background-color: aqua;
  border-radius: 10;
  padding: 8;
  margin: 8;
}
</style>

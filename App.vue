<template>
  <view class="container">
    <text class="title">Pin Bin</text>

    <text>{{ emailInput }}</text>
    <text>{{ passwordInput }}</text>

    <text-input
      class="login-input"
      v-model="emailInput"
      placeholder="email"
    >
    </text-input>
    <text-input
      class="login-input"
      v-model="passwordInput"
      placeholder="password"
    >
    </text-input>

    <touchable-opacity
      :on-press="handleLogin"
      :style="{backgroundColor: 'blue'}"
    >
      <text
        :style="{
          color: 'blue',
          fontSize: 24,
          color: 'white',
          padding: 8
        }"
      >
        Login
      </text>
    </touchable-opacity>
    <touchable-opacity :on-press="handleSignUp">
      <text :style="{color: 'blue', fontSize: 16, margin: 8}">
        Sign Up
      </text>
    </touchable-opacity>
  </view>
</template>

<script>
import api from './src/api/api.js'

export default {
  data () {
    return {
      emailInput: '',
      passwordInput: ''
    }
  },

  methods: {
    async handleLogin () {
      let params = {
        'email': this.emailInput,
        'password': this.passwordInput
      }
      let resp = await api.request('post', 'auth', params)
        .then((resp) => resp)
      console.log(resp)
      alert(JSON.stringify(resp))
    },
    handleSignUp () {
      alert('Sign Up')
    }
  }
}
</script>

<style>
.container {
  background-color: white;
  align-items: center;
  justify-content: center;
  flex: 1;
}
.title {
  color: blue;
  font-size: 32px;
}
.desc {
  color: gray;
  font-size: 16px;
}
.login-input {
  height: 40;
  width: 150;
  border-color: gray;
  border-width: 1;
  padding: 8;
  margin: 8;
}
</style>

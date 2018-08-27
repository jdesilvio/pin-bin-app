<template>
  <view class="container">
    <text class="title">Pin Bin</text>

    <text>{{ usernameInput }}</text>
    <text>{{ emailInput }}</text>
    <text>{{ passwordInput }}</text>

    <text-input
      class="sign-up-input"
      v-model="usernameInput"
      placeholder="username"
    >
    </text-input>
    <text-input
      class="sign-up-input"
      v-model="emailInput"
      placeholder="email"
    >
    </text-input>
    <text-input
      class="sign-up-input"
      v-model="passwordInput"
      placeholder="password"
    >
    </text-input>

    <touchable-opacity
      :on-press="handleSignUp"
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
        Sign Up
      </text>
    </touchable-opacity>
    <touchable-opacity :on-press="handleLogin">
      <text :style="{color: 'blue', fontSize: 16, margin: 8}">
        Already have an account? Login
      </text>
    </touchable-opacity>
  </view>
</template>

<script>
import api from '../api'

export default {
  props: {
    navigation: {
      type: Object
    }
  },

  data () {
    return {
      usernameInput: '',
      emailInput: '',
      passwordInput: ''
    }
  },

  methods: {
    async handleSignUp () {
      let params = {
        'username': this.usernameInput,
        'email': this.emailInput,
        'password': this.passwordInput
      }
      let resp = await api.post('sign_up', params)
        .then((resp) => resp)
      console.log(resp)
      alert(JSON.stringify(resp))
    },
    handleLogin () {
      this.navigation.navigate('Login')
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
.sign-up-input {
  height: 40;
  width: 150;
  border-color: gray;
  border-width: 1;
  padding: 8;
  margin: 8;
}
</style>

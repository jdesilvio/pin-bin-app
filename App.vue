<template>
  <view class="container">
    <text class="title">Pin Bin</text>

    <text>{{ usernameInput }}</text>
    <text>{{ passwordInput }}</text>

    <text-input
      class="login-input"
      v-model="usernameInput"
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
export default {
  data () {
    return {
      usernameInput: '',
      passwordInput: ''
    }
  },

  methods: {
    handleLogin () {
      alert('Login')
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

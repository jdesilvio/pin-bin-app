<template>
  <view class="container">
    <image :source="logo" :style="{margin: 16}"/>

    <view :style="{padding: 8, alignItems: 'center', width: '100%'}">
      <text-input
        class="input"
        v-model="usernameInput"
        placeholder="username"
      />
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
        <btn btn-text="SIGN UP" :on-btn-press="handleSignUp"></btn>
        <button
          :on-press="goToLogin"
          title="Already have an account? Login"
          color="#F8A055"
          />
      </view>
    </view>
  </view>
</template>

<script>
import api from '../api'
import btn from '../components/Button'
import logo from '../../assets/pinbin-logo-128.png'

import { formatErrorMsg } from '../api/utils'

export default {
  props: {
    navigation: {
      type: Object
    }
  },

  data () {
    return {
      logo,
      usernameInput: '',
      emailInput: '',
      passwordInput: ''
    }
  },

  components: {
    btn
  },

  methods: {
    async handleSignUp () {
      let params = {
        'username': this.usernameInput,
        'email': this.emailInput,
        'password': this.passwordInput
      }

      await api.post('sign_up', params)
        .then((response) => {
          alert('Sweet! Your account was successfully created!')
          this.goToLogin()
        })
        .catch((error) => {
          const errorMsg = 'Oops! Something went wrong...\n\n'
          alert(errorMsg + formatErrorMsg(error))
        })
    },
    goToLogin () {
      this.navigation.navigate('Login')
    }
  }
}
</script>

<style>
.container {
  background-color: white;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  flex-direction: column;
}
.input {
  height: 40;
  width: 90%;
  background-color: #FFDB5C;
  border-radius: 10;
  padding: 8;
  margin: 8;
}
</style>

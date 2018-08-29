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
      <text
        :style="{color: 'red', fontSize: 10, padding: 8}"
        v-if="failedAttempt"
      >
        Please check that your username and/or password are correct.
      </text>

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
import { getJWT, getResource, formatErrorMsg } from '../api/utils'
import store from '../store'
import btn from '../components/Button'

export default {
  props: {
    navigation: {
      type: Object
    }
  },

  data () {
    return {
      emailInput: '',
      passwordInput: '',
      failedAttempt: false
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

      await api.post('auth', params)
        .then((response) => {
          if (response.data.error) {
            const errorReason = response.data.error.reason

            // Account not found
            if (errorReason === 'not_found') {
              alert('Account not found.')
              this.failedAttempt = true

            // Incorrect password
            } else if (errorReason === 'unauthorized') {
              this.failedAttempt = true
              alert('Incorrect password.')

            // Some other error
            } else {
              const errorMsg = JSON.stringify(response.data.error)
              alert(
                'Oops! An unexpected error occurred.\n\n' +
                errorMsg
              )
            }
          } else {
            store.commit('setJWT', getJWT(response))
            store.commit('setUserResource', getResource(response))

            if (store.state.jwt && store.state.userResource) {
              this.navigation.navigate('Home')
            } else {
              const errorMsg = JSON.stringify(response.data)
              alert(
                'Oops! An unexpected error occurred.\n\n' +
                errorMsg
              )
            }
          }
        })
        .catch((error) => {
          const errorMsg = 'Oops! Something went wrong...\n\n'
          alert(errorMsg + formatErrorMsg(error))
          alert(errorMsg)
        })
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

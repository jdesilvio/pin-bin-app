<template>
  <view class="container">
    <touchable-opacity :on-press="goToHome">
      <text :style="{color: 'blue', fontSize: 16, margin: 8}">
        Home
      </text>
    </touchable-opacity>
    <text class="title">My Account</text>
    <text>{{ userData }}</text>
  </view>
</template>

<script>
import api from '../api'
import store from '../store'

export default {
  props: {
    navigation: {
      type: Object
    }
  },

  data: {
    userData: {}
  },

  created: function () {
    this.getUserData()
  },

  methods: {
    goToHome () {
      this.navigation.navigate('Home')
    },
    getUserData () {
      api.get(store.state.userResource)
        .then((resp) => {
          var vm = this
          vm.userData = resp.data
        })
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
</style>

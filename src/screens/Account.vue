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

export default {
  props: {
    navigation: {
      type: Object
    }
  },

  computed: {
    userData: function () {
      return api.get('user/1')
    }
  },

  methods: {
    goToHome () {
      this.navigation.navigate('Home')
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

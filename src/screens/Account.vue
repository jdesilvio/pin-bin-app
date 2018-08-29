<template>
  <view class="container">
    <nav-bar :navigation="navigation"></nav-bar>
    <text class="title">My Account</text>
    <text>{{ userData }}</text>
  </view>
</template>

<script>
import api from '../api'
import store from '../store'
import NavigationBar from '../components/NavigationBar.vue'

export default {
  props: {
    navigation: {
      type: Object
    }
  },

  data: {
    userData: {}
  },

  components: {
    NavBar: NavigationBar
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
  justify-content: flex-start;
  flex: 1;
  flex-direction: column;
}
.title {
  color: blue;
  font-size: 32px;
}
</style>

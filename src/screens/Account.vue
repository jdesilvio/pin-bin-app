<template>
  <view class="container">
    <nav-bar :navigation="navigation"></nav-bar>
    <text class="title">My Account</text>
    <text>User ID: {{ userId }}</text>
    <text>Username: {{ username }}</text>
    <text>Email: {{ email }}</text>
  </view>
</template>

<script>
import api from '../api'
import store from '../store'
import NavigationBar from '../components/NavigationBar'
import btn from '../components/Button'

export default {
  props: {
    navigation: {
      type: Object
    }
  },

  data () {
    return {
      userId: null,
      username: '',
      email: ''
    }
  },

  components: {
    NavBar: NavigationBar,
    btn
  },

  created: function () {
    this.getUserData()
  },

  methods: {
    getUserData () {
      api.get(store.state.userResource)
        .then((resp) => {
          var vm = this
          vm.userId = resp.data.data.id
          vm.username = resp.data.data.username
          vm.email = resp.data.data.email
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
  color: #4987D8;
  font-size: 32px;
}
</style>

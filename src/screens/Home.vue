<template>
  <view class="container">
    <nav-bar :navigation="navigation"></nav-bar>
    <text class="title">Welcome to Pin Bin!</text>
  </view>
</template>

<script>
import NavigationBar from '../components/NavigationBar.vue'

export default {
  props: {
    navigation: {
      type: Object
    }
  },

  components: {
    NavBar: NavigationBar
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

<template>
  <view class="container">
    <nav-bar :navigation="navigation"></nav-bar>
    <image :source="logo" :style="{margin: 64}"/>
  </view>
</template>

<script>
import NavigationBar from '../components/NavigationBar.vue'
import logo from '../../assets/pinbin-logo-256.png';

export default {
  props: {
    navigation: {
      type: Object
    }
  },

  data () {
    return {
      logo
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
</style>

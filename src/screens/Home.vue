<template>
  <view class="container">
    <nav-bar :navigation="navigation"></nav-bar>
    <image :source="logo" :style="{margin: 64}"/>
    <btn btn-text="My Bins" :on-btn-press="goToBins"></btn>
  </view>
</template>

<script>
import NavigationBar from '../components/NavigationBar'
import btn from '../components/Button'
import logo from '../../assets/pinbin-logo-256.png'

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
    NavBar: NavigationBar,
    btn
  },

  methods: {
    goToBins () {
      this.navigation.navigate('Bins')
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
</style>

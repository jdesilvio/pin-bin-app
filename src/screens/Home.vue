<template>
  <view class="container">
    <nav-bar :navigation="navigation"></nav-bar>
    <image :source="logo" :style="{margin: 16}"/>
    <view :style="{padding: 8, alignItems: 'center', width: '100%'}">
      <btn btn-text="My Bins" :on-btn-press="goToBins"></btn>
    </view>
    <view :style="{padding: 8, alignItems: 'center', width: '100%'}">
      <btn btn-text="My Pins" :on-btn-press="goToPins"></btn>
    </view>
  </view>
</template>

<script>
import { Constants, Location, Permissions } from 'expo'

import btn from '../components/Button'
import NavigationBar from '../components/NavigationBar'

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
    btn,
    NavBar: NavigationBar,
  },

  methods: {
    goToBins () {
      this.navigation.navigate('Bins')
    },
    goToPins () {
      this.navigation.navigate('Pins')
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

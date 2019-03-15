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
    <view :style="{padding: 32}">
      <text>Version: {{ version }}</text>
    </view>
  </view>
</template>

<script>
import api from '../api'
import btn from '../components/Button'
import logo from '../../assets/pinbin-logo-256.png'
import NavigationBar from '../components/NavigationBar'
import store from '../store'

import * as data from '../../app.json'

import { Place, updateLocation } from '../location'

export default {
  props: {
    navigation: {
      type: Object
    }
  },

  data () {
    return {
      logo,
      version: data['expo']['version']
    }
  },

  created () {
    api.get(this.userResource + '/bins')
      .then(response => {
        let defaultBin = response.data.data[0].id
        store.commit('setDefaultBin', defaultBin)
      })
    updateLocation()
  },

  computed: {
    userResource: () => store.state.userResource
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

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

import api from '../api'
import btn from '../components/Button'
import NavigationBar from '../components/NavigationBar'
import store from '../store'
import { Place } from '../structures/location'

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

  async created () {
    console.log(JSON.stringify(store.state))
    var defaultBin
    await api.get(store.state.userResource + '/bins').then(response => {
      defaultBin = response.data.data[0].id
      store.commit('setDefaultBin', defaultBin)
    })
    await this.updateLocation()
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
    },
    updateLocation () {
      Permissions.askAsync(Permissions.LOCATION).then(status => {
        if (status.status !== 'granted') {
          errorMessage = 'Permission to access location was denied'
          alert(errorMessage)
        }
        else {
          Location.getCurrentPositionAsync({}).then(location => {
            store.commit('setCurrentLocation', new Place(location.coords.latitude, location.coords.longitude))
          })
        }
      }).catch(err => {
        console.log(err)
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
</style>

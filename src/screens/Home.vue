<template>
  <view class="container">
    <nav-bar :navigation="navigation"></nav-bar>
    <image :source="logo" :style="{margin: 16}"/>
    <view :style="{padding: 8, alignItems: 'center', width: '100%'}">
      <btn btn-text="My Bins" :on-btn-press="goToBins"></btn>
    </view>
    <view :style="{padding: 8, alignItems: 'center', width: '100%'}">
      <btn btn-text="Get Pins" :on-btn-press="getNearby"></btn>
    </view>
  </view>
</template>

<script>
import { Constants, Location, Permissions } from 'expo'

import api from '../api'
import store from '../store'
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

  mounted: function () {
    this.updateLocation()
  },

  methods: {
    goToBins () {
      this.navigation.navigate('Bins')
    },
    updateLocation () {
      Permissions.askAsync(Permissions.LOCATION).then(status => {
        if (status.status !== 'granted') {
          errorMessage = 'Permission to access location was denied'
          alert(errorMessage)
        }
        else {
          Location.getCurrentPositionAsync({}).then(location => {
            store.commit('setCurrentLocation', location)
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getLocation () {
      alert(JSON.stringify(store.state.currentLocation))
    },
    getNearby () {
      location = store.state.currentLocation
      params = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      }
      api.get('yelp', params).then(response => {
        data = response.data.data.yelp
        data = JSON.parse(data)
        businesses = data.businesses
        first10 = businesses.slice(0, 10)
        alert(JSON.stringify(first10))
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

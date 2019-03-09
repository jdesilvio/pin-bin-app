<template>
  <view class="container">
    <nav-bar :navigation="navigation"></nav-bar>
    <text class="title">{{ binName }}</text>
    <scroll-view>
      <view v-for="(pin, index) in pins" :key="index">
        <text>
          {{ pin.name }} [{{ distanceFromCurrentLocation(pin) }} miles away]
        </text>
      </view>
      </btn>
    </scroll-view>
  </view>
</template>

<script>
import { Constants, Location, Permissions } from 'expo'

import api from '../api'
import store from '../store'
import NavigationBar from '../components/NavigationBar'
import btn from '../components/Button'
import { Place } from '../structures/location'

export default {
  props: {
    navigation: {
      type: Object
    }
  },

  data () {
    return {
      binName: '',
      pins: [],
      currentBin: store.state.currentBin,
      currentLocation: store.state.currentLocation
    }
  },

  components: {
    NavBar: NavigationBar,
    btn
  },

  async created () {
    await this.getBin()
    await this.getPins()
    await this.updateLocation()
    console.log('created ***', this.currentLocation)
    console.log('created ***', this.currentBin)
  },

  methods: {
    getBin () {
      const binUrl = store.state.userResource + '/bins/' + this.currentBin
      api.get(binUrl)
        .then((resp) => {
          var vm = this
          vm.bin = resp.data.data
          vm.binName = vm.bin.name
        })
    },

    getPins () {
      const pinsUrl = store.state.userResource + '/bins/' + this.currentBin + '/pins'
      api.get(pinsUrl)
        .then((resp) => {
          var vm = this
          vm.pins = resp.data.data
        })
    },
    distanceFromCurrentLocation(pin) {
      const current = store.state.currentLocation
      const pinLocation = new Place(pin.latitude, pin.longitude)
      const dist = Place.distanceBetween(current, pinLocation)
      console.log('dist', current, pinLocation, dist)
      return dist
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


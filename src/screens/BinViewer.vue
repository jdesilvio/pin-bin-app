<template>
  <view class="container">
    <nav-bar :navigation="navigation"></nav-bar>
    <text class="title">{{ binName }}</text>
    <scroll-view :style="{width: '100%', margin: 16}">
      <view class="border" v-for="(pin, index) in pins" :key="index">
        <text>
          {{ pin.name }}
        </text>
        <text :style="{color: 'gray'}">
          [{{ distanceFromCurrentLocation(pin) }} mi.]
        </text>
      </view>
      </btn>
    </scroll-view>
  </view>
</template>

<script>
import api from '../api'
import store from '../store'
import NavigationBar from '../components/NavigationBar'
import btn from '../components/Button'
import { Place } from '../location'

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
      currentBinRoute:
        store.state.userResource +
        '/bins/' +
        store.state.currentBin,
      currentLocation: store.state.currentLocation
    }
  },

  components: {
    NavBar: NavigationBar,
    btn
  },

  created () {
    this.getBin()
    this.getPins()
  },

  methods: {
    getBin () {
      api.get(this.currentBinRoute)
        .then((resp) => {
          var vm = this
          vm.bin = resp.data.data
          vm.binName = vm.bin.name
        })
    },

    getPins () {
      const pinsRoute = this.currentBinRoute + '/pins'
      api.get(pinsRoute)
        .then((resp) => {
          var vm = this
          vm.pins = resp.data.data
        })
    },

    distanceFromCurrentLocation (pin) {
      const pinLocation = new Place(pin.latitude, pin.longitude)
      return Place.distanceBetween(this.currentLocation, pinLocation)
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
.border {
  border-bottom-width: 1;
  border-color: gray;
  width: 100%;
  padding: 16;
}
</style>

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
      currentBin: store.state.currentBin,
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
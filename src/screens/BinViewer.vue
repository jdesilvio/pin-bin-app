<template>
  <view class="container">
    <nav-bar :navigation="navigation"></nav-bar>
    <text class="title">{{ binName }}</text>
    <scroll-view :style="{width: '100%', margin: 16}">
      <view class="row" v-for="(pin, index) in pins" :key="index">
        <text class="row-elem">
          {{ pin.name }} [{{ pin.distance }} mi.]
        </text>
        <touchable-opacity
          class="row-elem"
          :on-press="() => deletePin(index, pin.id)"
          :style="{justifyContent: 'flex-end'}"
        >
          <icon name="trash" :size="24" color="#4987D8" />
        </touchable-opacity>
      </view>
      </btn>
    </scroll-view>
  </view>
</template>

<script>
import api from '../api'
import { formatErrorMsg } from '../api/utils'
import store from '../store'
import NavigationBar from '../components/NavigationBar'
import btn from '../components/Button'
import { Place } from '../location'

import icon from 'react-native-vector-icons/FontAwesome'

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
    btn,
    icon
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
          let vm = this
          let pins = resp.data.data
          pins.forEach((pin) => {
            pin.distance = this.distanceFromCurrentLocation(pin)
          })
          pins.sort((a, b) => a.distance - b.distance)
          this.pins = pins
        })
    },

    distanceFromCurrentLocation (pin) {
      const pinLocation = new Place(pin.latitude, pin.longitude)
      return Place.distanceBetween(this.currentLocation, pinLocation)
    },

    deletePin (index, id) {
      console.log('deleting pin')
      const pinRoute = [this.currentBinRoute, 'pins', id].join('/')
      api.delete(pinRoute)
        .then((resp) => {
          console.log('pin deleted')
          this.pins.splice(index, 1)
        })
        .catch((error) => {
          console.log('error deleting pin', error)
          const errorMsg = 'Oops! Something went wrong...\n\n'
          alert(errorMsg + formatErrorMsg(error))
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
.title {
  color: #4987D8;
  font-size: 32px;
}
.row {
  border-bottom-width: 1;
  border-color: gray;
  width: 100%;
  padding: 16;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
}
.row-elem {
padding: 16;
}
</style>

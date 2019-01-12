<template>
  <view class="container">
    <nav-bar :navigation="navigation"></nav-bar>

    <view :style="{padding: 16}">
      <pin-card
        :img-url="imgUrl"
        :name="name"
        :address="address"
        :footer-text="footerText">
      </pin-card>
    </view>

    <view :style="{padding: 8, alignItems: 'center', width: '100%'}">
      <btn btn-text="Get Pin" :on-btn-press="getPin"></btn>
    </view>
  </view>
</template>

<script>
import { Constants, Location, Permissions } from 'expo'

import api from '../api'
import btn from '../components/Button'
import NavigationBar from '../components/NavigationBar'
import PinCard from '../components/PinCard'
import Queue from '../structures/queue'
import store from '../store'

var queue = new Queue()

export default {
  props: {
    navigation: {
      type: Object
    }
  },

  data () {
    return {
      queue,
      imgUrl: '',
      name: '',
      address: '',
      footerText: ''
    }
  },

  components: {
    btn,
    PinCard,
    NavBar: NavigationBar,
  },

  mounted: function () {
    this.updateLocation()
  },

  methods: {
    updateLocation () {
      Permissions.askAsync(Permissions.LOCATION).then(status => {
        if (status.status !== 'granted') {
          errorMessage = 'Permission to access location was denied'
          alert(errorMessage)
        }
        else {
          Location.getCurrentPositionAsync({}).then(location => {
            store.commit('setCurrentLocation', location)
            console.log(JSON.stringify('update location', location))
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getLocation () {
      return store.state.currentLocation
    },
    locationAlert () {
      alert(JSON.stringify(this.getLocation()))
    },
    getNearby () {
      location = this.getLocation()
      params = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      }
      api.get('yelp', params).then(response => {
        data = response.data.data.yelp
        data = JSON.parse(data)
        businesses = data.businesses
        first10 = businesses.slice(0, 10)
        first10.forEach(x => this.queue.enqueue(x))
      })
    },
    loadFromQueue () {
      pin = this.queue.peek()
      console.log('load', JSON.stringify(pin))
      if (pin) {
        console.log('update pin')
        this.imgUrl = pin.image_url
        this.name = pin.name
        this.address = pin.location.address1
        this.footerText = pin.categories[0].title
      }
    },
    async getPin () {
      console.log('location', this.getLocation())
      await this.getNearby()
      this.loadFromQueue()
    }
  }
}
</script>

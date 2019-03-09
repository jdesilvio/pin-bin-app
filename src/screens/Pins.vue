<template>
  <view class="container">
    <nav-bar :navigation="navigation"></nav-bar>

    <view :style="{padding: 16, margin: 0}">
      <pin-card
        :img-url="imgUrl"
        :name="name"
        :address="address"
        :footer-text="footerText">
      </pin-card>
    </view>

    <view :style="{flex: 1, padding: 8, alignItems: 'center', width: '100%'}">
      <btn class="button" btn-text="Get Pin" :on-btn-press="getPin"></btn>
      <btn class="button" btn-text="Discard" :on-btn-press="discardPin"></btn>
      <btn class="button" btn-text="Save" :on-btn-press="savePin"></btn>
    </view>
    <view :style="{height: '10%'}"></view>
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

  async created () {
    var location = await this.updateLocation()
    console.log('location', location)
    await this.getNearby()
    console.log(JSON.stringify(this.queue))
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
            console.log('update locaton', JSON.stringify(location))
            return location
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
      console.log('get nearby')
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
      const pin = this.queue.peek()
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
      console.log('get pin')
      // TODO: check if the queue is empty then get more
      await this.getNearby()
      this.loadFromQueue()
    },
    discardPin () {
      console.log('discard pin')
      this.queue.dequeue()
      this.loadFromQueue()
    },
    savePin () {
      const pin = this.queue.dequeue()
      var endpoint
      var data

      this.loadFromQueue()

      console.log('saving', JSON.stringify(pin))
      endpoint = [
        store.state.userResource,
        'bins',
        store.state.defaultBin,
        'pins'
      ].join('/')
      console.log(endpoint)
      data = {
        pin: {
          name: pin.name,
          latitude: pin.coordinates.latitude,
          longitude: pin.coordinates.longitude
        }
      }
      console.log('data', data)
      api.post(endpoint, undefined, data).then(response => {
        console.log('save response', response)
      }).catch(err => {
        console.log('error', err)
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

<style>
.button {
  margin: 8;
}
</style>

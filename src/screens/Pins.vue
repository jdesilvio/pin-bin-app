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
      <btn class="button" btn-text="Discard" :on-btn-press="discardPin"></btn>
      <btn class="button" btn-text="Save" :on-btn-press="savePin"></btn>
    </view>

    <view :style="{height: '10%'}"></view>
  </view>
</template>

<script>
import api from '../api'
import btn from '../components/Button'
import NavigationBar from '../components/NavigationBar'
import PinCard from '../components/PinCard'
import Queue from '../structures/queue'
import store from '../store'
import { updateLocation, getLocationAsync } from '../location'

const batchSize = 10
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
      imgUrl: 'dummy',
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
    var location = await getLocationAsync()
    store.commit('setCurrentLocation', location)
    await this.getNearby()
    await this.loadFromQueue()
  },

  methods: {
    async getNearby () {
      const currentLocation = store.state.currentLocation

      params = {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude
      }

      await api.get('yelp', params).then(response => {
        data = response.data.data.yelp
        data = JSON.parse(data)
        businesses = data.businesses
        batch = businesses.slice(0, batchSize)
        batch.forEach(x => this.queue.enqueue(x))
      })
    },

    loadFromQueue () {
      const pin = this.queue.peek()

      console.log('load', JSON.stringify(pin))

      if (pin) {
        this.imgUrl = pin.image_url
        this.name = pin.name
        this.address = pin.location.address1
        this.footerText = pin.categories[0].title
      }

      // Reload queue if it is almost empty
      if (!this.queue.peek()) {
        this.getNearby()
      }
    },

    discardPin () {
      console.log('discard pin')

      this.queue.dequeue()
      this.loadFromQueue()
    },

    savePin () {
      console.log('saving pin')

      const pin = this.queue.dequeue()
      var endpoint
      var data

      this.loadFromQueue()

      endpoint = [
        store.state.userResource,
        'bins',
        store.state.defaultBin,
        'pins'
      ].join('/')

      data = {
        pin: {
          name: pin.name,
          latitude: pin.coordinates.latitude,
          longitude: pin.coordinates.longitude
        }
      }

      api.post(endpoint, undefined, data)
        .then(response => {
          console.log('save response', response)
        }).catch(err => {
          console.log('error', err)
        })
    },

    loadFromQueue () {
      const pin = this.queue.peek()

      console.log('load', JSON.stringify(pin))

      if (pin) {
        this.imgUrl = pin.image_url
        this.name = pin.name
        this.address = pin.location.address1
        this.footerText = pin.categories[0].title
      }

      updateLocation() // continuously update location
    }
  }
}
</script>

<style>
.button {
  margin: 8;
}
</style>

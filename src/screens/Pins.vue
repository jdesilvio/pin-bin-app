<template>
  <view class="container">
    <nav-bar :navigation="navigation"></nav-bar>

    <view :style="{padding: 16}">
      <pin-card
        img-url="https://upload.wikimedia.org/wikipedia/commons/4/4d/Batian_Nelion_and_pt_Slade_in_the_foreground_Mt_Kenya.JPG"
        name="hi"
        address="here"
        footer-text="Some footer text">
      </pin-card>
    </view>

    <view :style="{padding: 8, alignItems: 'center', width: '100%'}">
      <btn btn-text="My Location" :on-btn-press="locationAlert"></btn>
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
      queue
    }
  },

  components: {
    btn,
    PinCard,
    NavBar: NavigationBar,
  },

  beforeCreated: function () {
  },

  mounted: function () {
    this.updateLocation()
    //this.getNearby()
    //alert(JSON.stringify(this.queue.peek()))
    console.log('mounting')
    alert(this.getLocation())
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
      alert(this.getLocation())
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
        first10.forEach(x => this.queue.enqueue(x))
      })
    }
  }
}
</script>

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
  </view>
</template>

<script>
import PinCard from '../components/PinCard'
import NavigationBar from '../components/NavigationBar'

export default {
  props: {
    navigation: {
      type: Object
    }
  },

  components: {
    PinCard,
    NavBar: NavigationBar,
  }
}
</script>

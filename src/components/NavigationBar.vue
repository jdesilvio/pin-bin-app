<template>
  <view
    :style="{
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      backgroundColor: '#F7F9F9'
    }"
  >
    <touchable-opacity
      class="nav-element"
      :on-press="goToHome"
      :style="{justifyContent: 'flex-start'}"
    >
      <icon name="home" :size="24" color="#4987D8" />
    </touchable-opacity>
    <touchable-opacity
      class="nav-element"
      :on-press="goToAccount"
      :style="{justifyContent: 'flex-end'}"
    >
      <icon name="user-circle" :size="24" color="#4987D8" />
    </touchable-opacity>
  </view>
</template>

<script>
import icon from 'react-native-vector-icons/FontAwesome'

export default {
  props: {
    navigation: Object
  },

  created () {
    console.log(this.navigation)
  },

  components: {
    icon
  },

  methods: {
    goToHome () {
      this.navigation.navigate('Home')
    },
    goToAccount () {
      this.navigation.navigate('Account')
    }
  }
}
</script>

<style>
.nav-element {
  flex: 1;
  flex-direction: row;
  padding: 16;
}
</style>

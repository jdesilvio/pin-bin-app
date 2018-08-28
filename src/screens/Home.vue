<template>
  <view class="container">
    <touchable-opacity :on-press="goToAccount">
      <text :style="{color: 'blue', fontSize: 16, margin: 8}">
        My Account
      </text>
    </touchable-opacity>
    <text class="title">Welcome to Pin Bin!</text>
  </view>
</template>

<script>
export default {
  props: {
    navigation: {
      type: Object
    }
  },

  methods: {
    goToAccount () {
      this.navigation.navigate('Account')
    }
  }
}
</script>

<style>
.container {
  background-color: white;
  align-items: center;
  justify-content: center;
  flex: 1;
}
.title {
  color: blue;
  font-size: 32px;
}
</style>

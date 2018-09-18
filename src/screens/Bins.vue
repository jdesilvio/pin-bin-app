<template>
  <view class="container">
    <nav-bar :navigation="navigation"></nav-bar>
    <text class="title">My Bins</text>
    <scroll-view>
      <view v-for="(bin, index) in bins" :key="index">
        <text>{{ bin.name }}</text>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import api from '../api'
import store from '../store'
import NavigationBar from '../components/NavigationBar.vue'

export default {
  props: {
    navigation: {
      type: Object
    }
  },

  data () {
    return {
      bins: []
    }
  },

  components: {
    NavBar: NavigationBar
  },

  created: function () {
    this.getUserBins()
  },

  methods: {
    getUserBins () {
      api.get(store.state.userResource + '/bins')
        .then((resp) => {
          var vm = this
          vm.bins = resp.data.data
          console.log(this.bins)
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
</style>

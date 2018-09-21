<template>
  <view class="container">
    <nav-bar :navigation="navigation"></nav-bar>
    <text class="title">My Bins</text>
    <scroll-view>
      <view v-for="(bin, index) in bins" :key="index">
        <text>{{ bin.name }}</text>
      </view>
      </btn>
    </scroll-view>
    <btn
      v-if="bins.length === 0"
      btn-text="Create Bin"
      :on-btn-press="createDefaultBin"
    >
  </view>
</template>

<script>
import api from '../api'
import store from '../store'
import NavigationBar from '../components/NavigationBar.vue'
import btn from '../components/Button'

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
    NavBar: NavigationBar,
    btn
  },

  created: function () {
    this.getUserBins()
  },

  methods: {
    getUserBins () {
      api.get(this.resource)
        .then((resp) => {
          var vm = this
          vm.bins = resp.data.data
          console.log(this.bins)
        })
    },
    createDefaultBin () {
      data = {
        bin: {
          name: 'default bin',
          short_name: 'default_bin'
        }
      }
      api.post(this.resource, false, data)
        .then((resp) => {
          this.getUserBins()
          console.log(this.bins)
        })
    }
  },

  computed: {
    resource: function () {
      return store.state.userResource + '/bins'
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

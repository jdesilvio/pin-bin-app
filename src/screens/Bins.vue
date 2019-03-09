<template>
  <view class="container">
    <nav-bar :navigation="navigation"></nav-bar>
    <text class="title">My Bins</text>
    <view
      v-for="(bin, index) in bins"
      :key="index"
      :style="{flex: 1, padding: 8, alignItems: 'center', width: '100%'}"
    >
    <btn class="button" :btn-text="bin.name" :on-btn-press="() => goToBinViewer(bin.id)"></btn>
    </view>
    <btn
      v-if="bins.length === 0"
      btn-text="Create Bin"
      :on-btn-press="createDefaultBin"
    ></btn>
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
    },

    goToBinViewer (id) {
      console.log('go to bin viewer', id)
      store.commit('setCurrentBin', id)
      console.log('***', id)
      this.navigation.navigate('BinViewer')
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

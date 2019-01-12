<template>
  <view
    class="card"
    :style="{
      height: '80%',
      width: '100%',
      alignSelf: 'center',
      borderWidth: 0.5,
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 1,
    }"
  >
    <image
      :style="{flex: 1, flexDirection: 'column', alignItems: 'flex-start'}"
      :source="{uri: imgUrl}"
    />
    <view class="card-body" :style="{backgroundColor: 'white'}">
      <text class="text" :style="{fontSize: 24, color: 'black'}">
        {{ name }}
      </text>
      <text class="text" :style="{fontSize: 16, color: 'grey'}">
        {{ address }}
      </text>
    </view>

    <view
      class="card-footer"
      :style="{
        backgroundColor: '#D3D3D3',
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4
      }">
      <text class="text" :style="{fontSize: 12, color: 'black'}">
        {{ footerText }}
      </text>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    imgUrl: String,
    name: String,
    address: String,
    footerText: String
  }
}
</script>

<style>
.text {
  text-align: center;
  padding: 4;
}
</style>

<template>
  <view>
    <view class="card">
      <image
        :style="{width: 50, height: 50}"
        :source="{uri: imgUrl}"
      />
      <text :style="{fontSize: 16, textAlign: 'center', color: 'black'}">
        {{ name }}
      </text>
      <text :style="{fontSize: 16, textAlign: 'center', color: 'black'}">
        {{ address }}
      </text>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    imgUrl: String,
    name: String,
    address: String
  }
}
</script>

<style>
.card {
  max-width: 960px;
  padding: 16;
  width: 95%;
  border-radius: 10;
  border-width: 0.5;
  border-color: #d6d7da;
}
</style>


<template>
  <touchable-opacity
    :on-press="onBtnPress"
    :style="{
      backgroundColor: '#4987D8',
      width: '95%',
      height: 40,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    }"
  >
    <text :style="{fontSize: 16, textAlign: 'center', color: 'white'}">
      {{ btnText }}
    </text>
  </touchable-opacity>
</template>

<script>
export default {
  props: {
    btnText: String,
    onBtnPress: Function
  }
}
</script>

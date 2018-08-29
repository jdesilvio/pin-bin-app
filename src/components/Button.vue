<template>
  <touchable-opacity
    :on-press="onBtnPress"
    :style="{
      backgroundColor: 'blue',
      width: '30%',
      height: 40,
      borderRadius: 20,
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

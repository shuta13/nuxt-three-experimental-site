<template lang="pug">
  .container
    canvas#canvas(ref="canvas")
</template>

<script>
export default {
  mounted() {
    this.configFont()
  },
  methods: {
    configFont() {
      const canvas = document.getElementById('canvas')
      const context = canvas.getContext('2d')
      context.font = '20px Ubuntu'
      context.fillText('hoge', 20, 20)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
}
</style>

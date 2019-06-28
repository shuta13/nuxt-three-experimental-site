<template lang="pug">
  .container
    .link-wrap
      a(href="/aline")(@mouseleave="removeFontColor")(@mouseover="hoveredAline").a-line a-line
      a(href="/deepsea")(@mouseleave="removeFontColor")(@mouseover="hoveredDeepsea").deep-sea deep-sea
      a(href="/glitch")(@mouseleave="removeFontColor")(@mouseover="hoveredGlitch").glitch glitch
      a(href="/soundglitch")(@mouseleave="removeFontColor")(@mouseover="hoveredSoundglitch").sound-glitch sound-glitch
</template>

<script>
import TweenMax from 'gsap'

export default {
  data() {
    return {
      target: null
    }
  },
  methods: {
    // もうちょい短縮したい
    hoveredAline() {
      this.target = '.a-line'
      this.changeFontColor()
    },
    hoveredDeepsea() {
      this.target = '.deep-sea'
      this.changeFontColor()
    },
    hoveredGlitch() {
      this.target = '.glitch'
      this.changeFontColor()
    },
    hoveredSoundglitch() {
      this.target = '.sound-glitch'
      this.changeFontColor()
    },
    changeFontColor() {
      TweenMax.to(`${this.target}`, 0.25, {
        color: 'rgb(255, 40, 40)'
      })
    },
    removeFontColor() {
      TweenMax.to(['.a-line', '.deep-sea', '.glitch', '.sound-glitch'], 0.25, {
        color: '#fff'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  font-size: 62.5%;
}

.container {
  width: 100vw;
  height: 100vh;
  background-color: rgb(40, 40, 40);
}

.link-wrap {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 10vh;
}

a {
  text-decoration: none;
  font-size: 4vw;
  font-family: 'DM Sans';
  color: #fff;
}
</style>

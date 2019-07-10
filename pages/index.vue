<template lang="pug">
  .container
    .link-wrap
      a(href="/deepsea")(@mouseleave="removeFontColor")(@mouseover="hoveredDeepsea").deep-sea deep-sea
      a(href="/glitch")(@mouseleave="removeFontColor")(@mouseover="hoveredGlitch").glitch glitch
      a(href="/soundglitch")(@mouseleave="removeFontColor")(@mouseover="hoveredSoundglitch").sound-glitch sound-glitch
      a(href="/fonteffects")(@mouseleave="removeFontColor")(@mouseover="hoveredFontEffects").font-effects font-effects
    app-blinder.blind
</template>

<script>
import TweenMax from 'gsap'
import AppBlinder from '~/components/AppBlinder.vue'

export default {
  components: {
    AppBlinder
  },
  data() {
    return {
      target: null,
      rmTargets: ['.a-line', '.deep-sea', '.glitch', '.sound-glitch', '.font-effects']
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
    hoveredFontEffects() {
      this.target = '.font-effects'
      this.changeFontColor()
    },
    changeFontColor() {
      TweenMax.to(`${this.target}`, 0.25, {
        color: 'rgb(255, 40, 40)'
      })
    },
    removeFontColor() {
      TweenMax.to(this.rmTargets, 0.25, {
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
  position: absolute;
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

.blind {
  z-index: 999;
}
</style>

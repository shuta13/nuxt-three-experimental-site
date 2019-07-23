<template lang="pug">
  .container
    .item-wrap(v-for="number in numbers")(:key="number")
      .item
        .rect
        span.piyo(@mouseover="over")(@mouseleave="left") {{ number }}
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { TweenMax, Power4 } from 'gsap'
@Component
class UiExperiment extends Vue {
  sleep = msec => new Promise(resolve => setTimeout(resolve, msec))
  async mounted() {
    this.over()
    await this.sleep(960)
    this.left()
  }
  numbers = [1, 2, 3, 4]
  over() {
    TweenMax.to('.rect', 0, {
      ease: Power4.easeInOut,
      transform: 'translate(-102%, 0)'
    })
    TweenMax.to('.rect', 0.8, {
      ease: Power4.easeInOut,
      transform: 'translate(0%, 0)',
      martix: '(1, 0, 0, 1, 0, 0)'
    })
  }
  left() {
    TweenMax.to('.rect', 0.8, {
      ease: Power4.easeInOut,
      transform: 'translate(102%, 0)'
    })
  }
}
export default UiExperiment
</script>

<style lang="scss" scoped>
.container {
  background-color: rgba(200, 200, 200, 1);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200vw;
}
.item {
  position: absolute;
  overflow: hidden;
  width: 200px;
  height: 90px;
  cursor: pointer;
}
.rect {
  // opacity: 0;
  border-radius: 2px;
  position: absolute;
  background-color: rgba(79,182,207,1);
  width: 100%;
  height: 100%;
  transform: translate(-102%, 0);
}
.piyo {
  // background-color: rgba(100, 100, 100, 1);
  border-radius: 2px;
  position: absolute;
  text-align: center;
  width: 100%;
  height: 100%;
  font-family: 'Rajdhani';
  font-size: 4rem;
  color: rgba(40, 40, 40, 1);
  transition: color 0.8s cubic-bezier(.45, .2, .5, 1);
}
.piyo:hover {
  color: rgba(200, 200, 200, 1);
}
a {
  font-family: 'Rajdhani';
  font-size: 4rem;
  background-image: linear-gradient(to right, rgba(0,0,0,0) 50%, rgba(79,182,207,1) 50%);
  background-position: 0 0;
  background-size: 200% auto;
  transition: 0.5s;
}
a:hover {
  background-position: -100% 0;
  color: #fff;
}
</style>

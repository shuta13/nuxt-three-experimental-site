<template lang="pug">
  .container
    .link-wrap
      a(href="/deepsea") deep-sea
      a(href="/glitch") glitch
      a(href="/soundglitch") sound-glitch
      a(href="/fonteffects") font-effects
      a(href="/objects-motion") objects-motion
      a(href="/ui-experiments") ui-experiments
    app-blinder.blind
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import AppBlinder from '~/components/AppBlinder.vue'

@Component({
  components: {
    AppBlinder
  }
})
class TopClass extends Vue {}
export default TopClass
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
  transition: color .2s;
}

a:hover {
  color: rgb(255, 40, 40);
}

.blind {
  z-index: 999;
}
</style>

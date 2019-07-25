<template lang="pug">
  .containter
    FontAwesomeIcon.icon(:icon="twitter")
    FontAwesomeIcon.icon(:icon="github")
    FontAwesomeIcon.icon(:icon="facebook")
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'nuxt-property-decorator'
import {
  faTwitterSquare,
  faGithubSquare,
  faFacebookSquare
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
@Component({
  components: {
    FontAwesomeIcon
  }
})
class FontawesomeTest extends Vue {
  @Provide()
  twitter = faTwitterSquare
  github = faGithubSquare
  facebook = faFacebookSquare
}
export default FontawesomeTest
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
}
</style>

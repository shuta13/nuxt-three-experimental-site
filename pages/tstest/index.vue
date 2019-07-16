<template lang="pug">
  ts-test
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import TsTest from '~/components/TsTest.vue'
@Component({
  components: {
    TsTest
  }
})
class Hoge extends Vue {
  // OK
  width = 0;
  height = 0;
  mounted() {
    this.width = window.innerWidth
    this.height = window.innerHeight
  }
}
export default Hoge
</script>

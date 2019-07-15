<template lang="pug">
  objects-motion
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import ObjectsMotion from '~/components/ObjectsMotion.vue'

@Component({
  components: {
    ObjectsMotion
  }
})
class Hoge extends Vue {
}
export default Hoge
</script>

<style lang="scss" scoped>

</style>

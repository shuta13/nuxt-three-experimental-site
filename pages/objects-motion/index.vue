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
class ObjectsMotionClass extends Vue {
}
export default ObjectsMotionClass
</script>

<style lang="scss" scoped>

</style>

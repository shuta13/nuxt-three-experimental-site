<template lang="pug">
  gltf-object
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import GltfObject from '~/components/GltfObject.vue'

@Component({
  components: {
    GltfObject
  }
})
class GltfObjectClass extends Vue {
}
export default GltfObjectClass
</script>

<style lang="scss" scoped>

</style>

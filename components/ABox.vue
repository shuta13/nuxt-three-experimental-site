<script>
import * as THREE from 'three'

export default {
  name: 'BoxSample',
  data() {
    // === scene ===
    const scene = new THREE.Scene()

    // === renderer ===
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)

    // === camera ===
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    // === light ===
    const light = new THREE.DirectionalLight(0xffffff)
    light.position.set(0, 0, 10)

    // === model ===
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 })
    const cube = new THREE.Mesh(geometry, material)

    return {
      scene: scene,
      renderer: renderer,
      camera: camera,
      light: light,
      cube: cube,
      canRender: false
    }
  },
  created() {
    // === sceneにmodel,light, cameraを追加 ===
    this.scene.add(this.camera)
    this.scene.add(this.light)
    this.scene.add(this.cube)
  },
  mounted() {
    this.canRender = true
  },
  updated() {
    const stage = document.getElementById('stage')
    stage.appendChild(this.renderer.domElement)
    this.animate()
  },
  methods: {
    animate() {
      requestAnimationFrame(this.animate)

      this.cube.rotation.x += 0.05
      this.cube.rotation.y += 0.05

      this.renderer.render(this.scene, this.camera)
    }
  },
  render(h) {
    if (this.canRender) {
      if (process.env.NODE_ENV === 'development' && this.$slots.default && this.$slots.default.length > 1) {
        throw new Error('[vue-no-ssr] You cannot use multiple child components')
      }

      return h('div',
        {
          class: 'stage',
          attrs: { id: 'stage' }
        }
      )
    }
    return h('div', 'server side')
  }
}
</script>

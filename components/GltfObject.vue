<template lang="pug">
  #canvas(ref="canvas")
</template>

<script>
import * as THREE from 'three'
// DRACOLoaderのエラーが出る
// import { GLTFLoader } from 'three-gltf-loader'

export default {
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      started: false
    }
  },
  mounted() {
    this.init()
    this.configScene()
    this.positionCamera()
    this.bindWindowEvents()
    this.appendElement()
    this.startScene()
  },
  methods: {
    init() {
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        1,
        1000
      )
      this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      this.renderer.setClearColor(0x000000, 1)
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    },
    configScene() {
      const light = new THREE.AmbientLight(0xffffff)
      this.scene.add(light)
    },
    positionCamera() {
      this.camera.position.set(0, 0, 100)
    },
    // 処理
    // setGltf() {
    //   const gltfLoader = new GLTFLoader()
    //   const url = 'http://localhost:3000/3DModel/cesar_-_louvre_museum/scene.gltf'
    //   gltfLoader.load(url, (gltf) => {
    //     const model = gltf.scene
    //     this.scene.add(model)
    //   })
    //   this.renderer.gammaOutput = true
    // },
    bindWindowEvents() {
      window.addEventListener('resize', this.handleWindowResize, false)
    },
    handleWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight
    },
    appendElement() {
      this.$refs.canvas.appendChild(this.renderer.domElement)
    },
    startScene() {
      if (this.started) return
      this.renderScene()
      this.started = !this.started
    },
    renderScene() {
      requestAnimationFrame(this.renderScene)
      this.renderer.render(this.scene, this.camera)
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

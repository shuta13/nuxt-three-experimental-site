<template lang="pug">
  #canvas(ref="canvas")
</template>

<script>
import * as THREE from 'three'

export default {
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      material: null,
      mesh: null,
      started: false
    }
  },
  mounted() {
    this.init()
    this.configScene()
    this.positionCamera()
    this.createTexture()
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
    createTexture() {
      const canvas = document.createElement('canvas')
      const width = 2048
      const height = 1024
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx.font = 'Bold 200px Ubuntu'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = 'rgba(255, 255, 255, 1.0)'
      ctx.fillText('FUCK IT ALL', width / 2, height / 2)
      const texture = new THREE.CanvasTexture(canvas)
      texture.needsUpdate = false
      this.material = new THREE.MeshBasicMaterial()
      this.material.map = texture
      this.mesh = new THREE.Mesh(new THREE.BoxBufferGeometry(160, 80), this.material)
      this.scene.add(this.mesh)
    },
    bindWindowEvents() {
      window.addEventListener('resize', this.handleWindowResize, false)
    },
    handleWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight
    },
    appendElement() {
      this.renderer.domElement.style = 'background-color: #000'
      document.body.appendChild(this.renderer.domElement)
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

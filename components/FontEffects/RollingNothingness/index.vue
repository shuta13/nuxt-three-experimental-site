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
      context: null,
      canvas: null,
      texture: null,
      material: null,
      geometry: null,
      started: false
    }
  },
  mounted() {
    this.init()
    this.configScene()
    this.positionCamera()
    this.bindWindowEvents()
    this.appendThreeDomElement()
    this.processToDomElement()
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
      this.renderer.setClearColor(0xffffff, 1)
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    },
    configScene() {
      const light = new THREE.AmbientLight(0xffffff)
      this.scene.add(light)
    },
    positionCamera() {
      this.camera.position.set(0, 0, 10)
    },
    // 処理
    bindWindowEvents() {
      window.addEventListener('resize', this.handleWindowResize, false)
    },
    handleWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight
    },
    appendThreeDomElement() {
      this.$refs.canvas.appendChild(this.renderer.domElement)
    },
    processToDomElement() {
      this.canvas = document.createElement('canvas')
      this.canvas.width = 512
      this.canvas.height = 512
      this.context = this.canvas.getContext('2d')
      this.setPropertyOfFont()
    },
    setPropertyOfFont() {
      this.context.beginPath()
      this.context.font = 'Normal 40px Arial'
      this.context.fillStyle = 'rbg(40, 40, 40)'
      this.context.textAlign = 'center'
      this.context.fillText('hoge', window.innerWidth / 2, window.innerHeight / 2)
      this.texture = new THREE.CanvasTexture(this.canvas)
      this.texture.needsUpdate = true
      this.createObject()
    },
    createObject() {
      this.material = new THREE.MeshBasicMaterial({ map: this.texture })
      this.material.transparent = true
      this.geometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight)
      const plane = new THREE.Mesh(this.material, this.geometry)
      this.scene.add(plane)
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
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
#canvas {
  width: 100vw;
  height: 100vh;
}
</style>

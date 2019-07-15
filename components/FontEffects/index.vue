<template lang="pug">
  #canvas(ref="canvas")
</template>

<script>
import * as THREE from 'three'
import vertexShader from './shader/vert.glsl'
import fragmentShader from './shader/frag.glsl'

export default {
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      material: null,
      mesh: null,
      time: { type: 'f', value: 0.0 },
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
      ctx.font = '600px Noto Serif JP'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = 'rgba(255, 255, 255, 1.0)'
      ctx.fillText('虚ろ', width / 2, height / 2)
      const texture = new THREE.CanvasTexture(canvas)
      texture.needsUpdate = false
      // this.material = new THREE.MeshBasicMaterial()
      // this.material.map = texture
      this.material = new THREE.RawShaderMaterial({
        uniforms: {
          texture: { type: 't', value: texture },
          time: this.time,
          nScale: { type: 'fv', value: [3, 3] }
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        transparent: true
      })
      // BoxBufferGeometryの(x, y, z)のうちzは無視(0)
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
      // 黒に統一
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
      this.time.value += 0.01
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

<template>
  <section class="section">
    <div
      id="canvas"
      ref="canvas"
    />
  </section>
</template>

<script>
/* eslint-disable */
import * as THREE from 'three'
import { EffectComposer, RenderPass, GlitchPass, MaskPass, ShaderPass, CopyShader, DigitalGlitch, BloomPass } from 'three-full'

export default {
  components: {},
  data() {
    return {
      scene: undefined,
      camera: undefined,
      object: undefined,
      renderer: undefined,
      composer: undefined,
      renderPass: undefined,
      glitchPass: undefined,
      customPass: undefined,
      effectGlitch: undefined,
      started: false
    }
  },
  mounted() {
    this.init()
    this.configScene()
    this.positionCamera()
    this.bindWindowEvents()
    this.$refs.canvas.appendChild(this.renderer.domElement)
    this.startScene()
  },
  methods: {
    // setup
    init() {
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        1,
        1000
      )
      this.renderer = new THREE.WebGLRenderer({ antialias: true })
      this.renderer.setClearColor(new THREE.Color(0x222222))
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.object = new THREE.Object3D()
      this.scene.add(this.object)
    },

    configScene() {
      // add spotlight and ambient light
      this.scene.fog = new THREE.Fog(0xffffff, 1, 1000)

      const spotLight = new THREE.DirectionalLight(0xffffff)
      spotLight.position.set(1, 1, 1)
      this.scene.add(spotLight)

      const ambientLight = new THREE.AmbientLight(0x222222)
      this.scene.add(ambientLight)
    },

    positionCamera() {
      // position the camera for the scene
      this.camera.position.z = 400
    },

    createObj() {
      const geometry = new THREE.SphereBufferGeometry(2, 4 * Math.random(), 4 * Math.random())

      for (let i = 0; i < 100; i++) {
        const material = new THREE.MeshPhongMaterial({
          color: 0x000000,
          flatShading: true
        })
        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize()
        mesh.position.multiplyScalar(Math.random() * 400)
        mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2)
        mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 50
        this.object.add(mesh)
      }
    },

    postProcessing() {
      this.composer = new EffectComposer(this.renderer)
      this.renderPass = new RenderPass(this.scene, this.camera)
      this.composer.addPass(this.renderPass)
      
      this.effectGlitch = new GlitchPass(64)
      // trueになるとワイルドになる
      // this.effectGlitch.goWild = true
      this.effectGlitch.renderToScreen = true

      this.composer.addPass(this.effectGlitch)
    },

    startScene() {
      if (this.started) return

      this.createObj()
      this.postProcessing()
      this.renderScene()

      this.started = !this.started
    },

    renderScene() {
      window.RAF = requestAnimationFrame(this.renderScene)
      this.object.rotation.y += 0.01
      this.object.rotation.z += 0.01
      this.composer.render()
    },

    bindWindowEvents() {
      // resize
      window.addEventListener('resize', this.handleWindowResize, false)
    },

    handleWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.composer.setSize(window.innerWidth, window.innerHeight)
    }
  }
}
</script>

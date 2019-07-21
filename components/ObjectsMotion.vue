<template lang="pug">
</template>

<script>
import * as THREE from 'three'
// import { BloomEffect, EffectComposer, EffectPass, RenderPass } from 'postprocessing' // eslint-disable-line

export default {
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      spotLight: null,
      origin: null,
      obj: null,
      started: false,
      lightAngle: 0,
      payload: 0,
      objectX: -30,
      objectY: -20,
      color: null,
      stdMtr: null,
      mshBox: null,
      mshSphere: null,
      mshKnot: null,
      composer: null,
      params: {
        bloomStrength: 2,
        bloomThreshold: 10,
        bloomRadius: 0
      }
    }
  },
  mounted() {
    this.init()
    this.configScene()
    this.positionCamera()
    this.createObjects()
    // this.createPostProcess()
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
      this.origin = new THREE.Vector3()
    },
    configScene() {
      const light = new THREE.AmbientLight(0xffffff, 1.0)
      this.scene.add(light)
      this.spotLight = new THREE.SpotLight(0xFFFFFF, 4, 100, Math.PI, 20, 0.5)
      this.spotLight.position.set(0, 0, 30)
      this.scene.add(this.spotLight)
    },
    positionCamera() {
      this.camera.position.set(0, 0, 60)
      this.camera.lookAt(this.origin)
    },
    // 処理
    createObjects() {
      const red = new THREE.Color('rgb(245, 40, 40)')
      const green = new THREE.Color('rgb(-160, -600, -600')
      const blue = new THREE.Color('rgb(40, 40, 245)')
      this.obj = new THREE.Object3D()
      this.scene.add(this.obj)
      for (let i = 0; i < 30; i++) {
        if (i % 2 === 0) this.color = red
        else if (i % 3 === 0) this.color = green
        else this.color = blue
        this.stdMtr = new THREE.MeshStandardMaterial({ color: this.color, roughness: 0, metalness: 0, wireframe: true })
        const geoBox = new THREE.BoxBufferGeometry(Math.PI * Math.random(), Math.sqrt(2) * Math.random(), Math.E)
        this.mshBox = new THREE.Mesh(geoBox, this.stdMtr)
        this.mshBox.position.x = this.objectX
        this.mshBox.position.y = this.objectY
        this.mshBox.rotation.set(0, Math.PI / 2.0, 0)
        this.mshBox.rotation.y = 4
        this.mshBox.rotation.z = 12
        this.mshBox.castShadow = true
        this.mshBox.receiveShadow = true
        this.obj.add(this.mshBox)

        const geoSphere = new THREE.SphereBufferGeometry(0.1 + i * 0.04, 32, 32)
        this.mshSphere = new THREE.Mesh(geoSphere, this.stdMtr)
        this.mshSphere.position.x = this.objectX - 5
        this.mshSphere.position.y = this.objectY
        this.mshSphere.castShadow = true
        this.mshSphere.receiveShadow = true
        this.obj.add(this.mshSphere)

        const geoKnot = new THREE.TorusKnotBufferGeometry(1.5, 0.5, 100, 16)
        this.mshKnot = new THREE.Mesh(geoKnot, this.stdMtr)
        this.mshKnot.position.x = this.objectX + 5
        this.mshKnot.position.y = this.objectY
        this.mshKnot.rotation.x = 20 + i * 0.1
        this.mshKnot.rotation.z = 20 + i * 0.1
        this.mshKnot.castShadow = true
        this.mshKnot.receiveShadow = true
        this.obj.add(this.mshKnot)

        if (this.objectX <= 20) this.objectX += 15
        else {
          this.objectX = -30
          this.objectY += 8
        }
      }
    },
    // createPostProcess() {
    //   this.composer = new EffectComposer(this.renderer)
    //   const bloomPass = new BloomEffect()
    //   bloomPass.threshold = this.params.bloomThreshold
    //   bloomPass.strength = this.params.bloomStrength
    //   bloomPass.radius = this.params.bloomRadius
    //   this.composer.addPass(bloomPass)
    //   const effectPass = new EffectPass(this.camera, bloomPass)
    //   effectPass.renderToScreen = true
    //   this.composer.addPass(new RenderPass(this.scene, this.camera))
    //   this.composer.addPass(effectPass)
    // },
    bindWindowEvents() {
      window.addEventListener('resize', this.handleWindowResize, false)
    },
    handleWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight
    },
    appendElement() {
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
      // this.composer.render()
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.lightAngle -= 0.04
      this.spotLight.position.x = 8 * Math.sin(this.lightAngle)
      this.spotLight.position.y = 8 * Math.cos(this.lightAngle)

      this.payload -= 0.03
      this.obj.position.y = 0.4 * Math.sin(this.payload)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

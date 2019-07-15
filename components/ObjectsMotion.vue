<template lang="pug">

</template>

<script>
import * as THREE from 'three'

export default {
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      spotLight: null,
      origin: null,
      started: false,
      lightAngle: 0,
      payload: 0,
      stdMtr: null,
      mshBox: null,
      mshSphere: null,
      mshKnot: null
    }
  },
  mounted() {
    this.init()
    this.configScene()
    this.positionCamera()
    this.createObjects()
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
      this.spotLight.position.set(0, 0, 10)
      this.scene.add(this.spotLight)
    },
    positionCamera() {
      this.camera.position.set(0, 20, 35)
      this.camera.lookAt(this.origin)
    },
    // 処理
    createObjects() {
      this.stdMtr = new THREE.MeshStandardMaterial({ color: 'rgb(100, 10, 10)', roughness: 0, metalness: 0 })

      const geoBox = new THREE.BoxBufferGeometry(Math.PI, Math.sqrt(2), Math.E)
      this.mshBox = new THREE.Mesh(geoBox, this.stdMtr)
      this.mshBox.position.set(0, 0, 0)
      this.mshBox.rotation.set(0, Math.PI / 2.0, 0)
      this.mshBox.rotation.y = 4
      this.mshBox.rotation.z = 20
      this.mshBox.castShadow = true
      this.mshBox.receiveShadow = true
      this.scene.add(this.mshBox)

      const geoSphere = new THREE.SphereBufferGeometry(1.5, 32, 32)
      this.mshSphere = new THREE.Mesh(geoSphere, this.stdMtr)
      this.mshSphere.position.set(-5, 0, 0)
      this.mshSphere.castShadow = true
      this.mshSphere.receiveShadow = true
      this.scene.add(this.mshSphere)

      const geoKnot = new THREE.TorusKnotBufferGeometry(1.5, 0.5, 100, 16)
      this.mshKnot = new THREE.Mesh(geoKnot, this.stdMtr)
      this.mshKnot.position.set(5, 0, 0)
      this.mshKnot.castShadow = true
      this.mshKnot.receiveShadow = true
      this.scene.add(this.mshKnot)
    },
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
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)

      this.lightAngle -= 0.04
      this.spotLight.position.x = 8 * Math.sin(this.lightAngle)
      this.spotLight.position.y = 8 * Math.cos(this.lightAngle)

      this.payload -= 0.03
      this.mshSphere.position.y = 0.4 * Math.sin(this.payload)
      if (this.payload < -0.06) this.mshBox.position.y = 0.01 * Math.sin(this.payload)
      if (this.payload < -0.08) this.mshKnot.position.y = 0.24 * Math.sin(this.payload)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

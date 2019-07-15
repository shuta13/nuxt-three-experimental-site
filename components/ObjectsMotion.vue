<template lang="pug">

</template>

<script>
import * as THREE from 'three'

export default {
  data() {
    return {
      scene: null,
      camera: null,
      spotLight: null,
      lightAngle: 0,
      renderer: null,
      origin: null,
      stdMtr: null,
      started: false
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
    createFloor() {
      const geoFloor = new THREE.BoxBufferGeometry(2000, 0.1, 2000)
      const mtrFloor = new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0, metalness: 0 })
      const mshFloor = new THREE.Math(geoFloor, mtrFloor)
      this.scene.add(mshFloor)
    },
    createObjects() {
      this.stdMtr = new THREE.MeshStandardMaterial({ color: 'rgb(100, 10, 10)', roughness: 0, metalness: 0 })

      const geoBox = new THREE.BoxBufferGeometry(Math.PI, Math.sqrt(2), Math.E)
      const mshBox = new THREE.Mesh(geoBox, this.stdMtr)
      mshBox.position.set(0, 0, 0)
      mshBox.rotation.set(0, Math.PI / 2.0, 0)
      mshBox.rotation.y = 4
      mshBox.rotation.z = 20
      mshBox.castShadow = true
      mshBox.receiveShadow = true
      this.scene.add(mshBox)

      const geoSphere = new THREE.SphereBufferGeometry(1.5, 32, 32)
      const mshSphere = new THREE.Mesh(geoSphere, this.stdMtr)
      mshSphere.position.set(-5, 0, 0)
      mshSphere.castShadow = true
      mshSphere.receiveShadow = true
      this.scene.add(mshSphere)

      const geoKnot = new THREE.TorusKnotBufferGeometry(1.5, 0.5, 100, 16)
      const mshKnot = new THREE.Mesh(geoKnot, this.stdMtr)
      mshKnot.position.set(5, 0, 0)
      mshKnot.castShadow = true
      mshKnot.receiveShadow = true
      this.scene.add(mshKnot)
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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

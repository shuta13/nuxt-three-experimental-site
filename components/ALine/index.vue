<template>
  <section class="section">
    <div
      id="three-element"
      ref="threeElement"
    />
  </section>
</template>

<script>
import * as THREE from 'three'

export default {
  components: {},
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      started: false,
      clock: null
    }
  },
  mounted() {
    this.setupCameraSceneRenderer()
    this.addLight()
    this.positionCamera()
    this.setupClock()
    this.bindWindowEvents()
    this.$refs.threeElement.appendChild(this.renderer.domElement)
    this.startScene()
  },
  methods: {
    /* THREE scene setup functions */
    setupCameraSceneRenderer() {
      // set up scene, camera, renderer, and axes
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      )
      this.renderer = new THREE.WebGLRenderer({ antialias: true })
      this.renderer.setClearColor(new THREE.Color(0x000000))
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.renderer.shadowMap.enabled = true
      this.renderer.shadowMapSoft = true
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    },
    addLight() {
      // add spotlight and ambient light
      const spotLight = new THREE.DirectionalLight(0xffffff)
      spotLight.position.set(-40, 60, -10)
      spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024)
      spotLight.shadow.camera.far = 100
      spotLight.shadow.camera.near = 10
      spotLight.castShadow = true
      spotLight.decay = 2
      spotLight.penumbra = 0.05
      this.scene.add(spotLight)

      const ambientLight = new THREE.AmbientLight(0x3c3c3c)
      this.scene.add(ambientLight)
    },
    positionCamera() {
      // position the camera for the scene
      this.camera.position.set(-30, 40, 30)
      this.camera.lookAt(this.scene.position)
    },
    setupClock() {
      this.clock = new THREE.Clock()
    },
    /* textures, geometries, meshes */
    createLine() {
      const lineMaterial = new THREE.LineBasicMaterial({
        color: Math.sin(Math.random()) * 0xffffff
      })
      const lineGeometry = new THREE.Geometry()
      lineGeometry.vertices.push(
        new THREE.Vector3(
          Math.random() * window.innerHeight,
          Math.random() * window.innerWidth,
          5
        )
      )
      lineGeometry.vertices.push(
        new THREE.Vector3(
          Math.random() * window.innerHeight,
          Math.random() * window.innerWidth,
          5
        )
      )
      lineGeometry.vertices.push(
        new THREE.Vector3(
          Math.random() * window.innerHeight,
          Math.random() * window.innerWidth,
          1
        )
      )
      lineGeometry.vertices.push(
        new THREE.Vector3(
          Math.random() * -window.innerHeight,
          Math.random() * -window.innerWidth,
          1
        )
      )
      const line = new THREE.Line(lineGeometry, lineMaterial)
      this.scene.add(line)
    },
    /* start and render functions */
    startScene() {
      if (this.started) return

      this.createLine()
      this.renderScene()

      this.started = !this.started
    },
    renderScene() {
      this.createLine()
      this.renderer.render(this.scene, this.camera)
      window.RAF = requestAnimationFrame(this.renderScene)
    },
    /* events */
    bindWindowEvents() {
      // window resize
      window.addEventListener('resize', this.handleWindowResize)
      // rotation keys
      window.addEventListener('keypress', this.changeCameraPosition)
    },
    handleWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    },
    changeCameraPosition(e) {
      const theta = 0.2 // the speed of rotation
      const x = this.camera.position.x
      const y = this.camera.position.y
      const z = this.camera.position.z

      e.preventDefault()

      switch (e.key) {
        case 'a': // left
          this.camera.position.x = x * Math.cos(theta) + z * Math.sin(theta)
          this.camera.position.z = z * Math.cos(theta) - x * Math.sin(theta)
          break
        case 'w': // up
          this.camera.position.y = y * Math.cos(theta) - z * Math.sin(theta)
          this.camera.position.z = z * Math.cos(theta) + y * Math.sin(theta)
          break
        case 's': // down
          this.camera.position.y = y * Math.cos(theta) + z * Math.sin(theta)
          this.camera.position.z = z * Math.cos(theta) - y * Math.sin(theta)
          break
        case 'd': // right
          this.camera.position.x = x * Math.cos(theta) - z * Math.sin(theta)
          this.camera.position.z = z * Math.cos(theta) + x * Math.sin(theta)
          break
        default:
          break
      }

      this.camera.lookAt(this.scene.position)
    }
  }
}
</script>

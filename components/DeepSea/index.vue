<template>
  <section class="section">
    <div
      id="canvas"
      ref="canvas"
    />
  </section>
</template>

<script>
import * as THREE from 'three'

export default {
  components: {},
  data() {
    return {
      scene: undefined,
      camera: undefined,
      renderer: undefined,
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
        75,
        window.innerWidth / window.innerHeight,
        1,
        3000
      )
      this.renderer = new THREE.WebGLRenderer({ antialias: true })
      this.renderer.setClearColor(new THREE.Color(0x222222))
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      // this.renderer.shadowMap.enabled = true
      // this.renderer.shadowMapSoft = true
      // this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    },

    configScene() {
      // add spotlight and ambient light
      const spotLight = new THREE.DirectionalLight(0x000000)
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

      const fogColor = (255, 255, 255, 240)
      this.scene.fog = new THREE.FogExp2(fogColor, 0.0008)
    },

    positionCamera() {
      // position the camera for the scene
      this.camera.position.z = 2400
    },

    createDust() {
      const geometry = new THREE.Geometry()

      for (let i = 0; i < 20000; i++) {
        const vertex = new THREE.Vector3()
        vertex.x = Math.random() * 2000 - 1000
        vertex.y = Math.random() * 2000 - 1000
        vertex.z = Math.random() * 2000 - 1000
        geometry.vertices.push(vertex)
      }

      for (let i = 0; i < 8; i++) {
        const particleSize = Math.random(60)
        const particleColor = (255, 255, 255, 20)
        const material = new THREE.ParticleBasicMaterial({
          size: particleSize * 100,
          color: particleColor
        })
        const particles = new THREE.ParticleSystem(geometry, material)
        particles.rotation.x = Math.random() * 6
        particles.rotation.y = Math.random() * 6
        particles.rotation.z = Math.random() * 6
        this.scene.add(particles)
      }
    },

    startScene() {
      if (this.started) return

      this.createDust()
      this.renderScene()

      this.started = !this.started
    },

    renderScene() {
      window.RAF = requestAnimationFrame(this.renderScene)

      for (let i = 0; i < this.scene.children.length; i++) {
        const positionNoise = Math.sin(i * 100)
        const wholeObj = this.scene.children[i]
        wholeObj.rotation.y += (0.0015 * positionNoise)
        wholeObj.rotation.x += (0.0015 * positionNoise)
      }
      this.camera.rotation.z += 0.0015
      this.renderer.render(this.scene, this.camera)
    },

    bindWindowEvents() {
      // resize
      window.addEventListener('resize', this.handleWindowResize)
    },

    handleWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    }
  }
}
</script>

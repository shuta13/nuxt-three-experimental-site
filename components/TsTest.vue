<template lang="pug">
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import * as THREE from 'three'
@Component
class TsTest extends Vue {
  width = 0;
  height = 0;
  renderer: any;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    50,
    this.width / this.height,
    1,
    1000
  );
  started = false;
  mounted() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.renderer = new THREE.WebGLRenderer()
    this.configScene()
    this.positionCamera()
    this.bindWindowEvents()
    this.appendElement()
    this.startScene()
  }
  configScene() {
    this.renderer.setClearColor(0x000000, 1)
    this.renderer.setSize(this.width, this.height)
    const light = new THREE.AmbientLight(0xffffff)
    this.scene.add(light)
  }
  positionCamera() {
    this.camera.position.set(0, 0, 100)
  }
  bindWindowEvents() {
    window.addEventListener('resize', this.handleWindowResize, false)
  }
  handleWindowResize() {
    this.camera.aspect = this.width / this.height
  }
  appendElement() {
    document.body.appendChild(this.renderer.domElement)
  }
  startScene() {
    if (this.started) return
    this.renderScene()
    this.started = !this.started
  }
  renderScene() {
    requestAnimationFrame(this.renderScene)
    this.renderer.render(this.scene, this.camera)
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(this.width, this.height)
  }
}
export default TsTest
</script>

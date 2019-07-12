// <template lang="pug">
//   .container
//     #canvas(ref="canvas")
// </template>

<script>
// import * as THREE from 'three'
// import { RawShaderMaterial } from 'three'
// import fragmentSource from './shader/fragment.glsl'
// import vertexSource from './shader/vertex.glsl'

// export default {
//   data() {
//     return {
//       scene: null,
//       camera: null,
//       renderer: null,
//       texture: null,
//       material: null,
//       geometry: null,
//       time: 0.0,
//       started: false
//     }
//   },
//   mounted() {
//     this.init()
//     this.configScene()
//     this.bindWindowEvents()
//     this.$refs.canvas.appendChild(this.renderer.domElement)
//     this.createMaterial()
//     this.startScene()
//   },
//   methods: {
//     init() {
//       this.scene = new THREE.Scene()
//       this.camera = new THREE.OrthographicCamera(
//         -1,
//         1,
//         1,
//         -1,
//         1,
//         1000
//       )
//       this.camera.position.set(0, 0, 100)
//       this.camera.lookAt(this.scene.position)
//       this.renderer = new THREE.WebGLRenderer({
//         alpha: false,
//         antialias: false,
//         stencil: false,
//         depth: false
//       })
//       this.renderer.setClearColor(0x000000)
//       this.renderer.setSize(window.innerWidth, window.innerHeight)
//       this.renderer.setPixelRatio(window.devicePixelRatio)
//     },
//     configScene() {
//       const light = new THREE.AmbientLight(0xffffff)
//       this.scene.add(light)
//     },
//     // 処理
//     createTexture() {
//       const canvas = document.createElement('canvas')
//       const width = 2048
//       const height = 1024
//       const context = canvas.getContext('2d')
//       context.font = 'Bold 200px Ubuntu'
//       context.textAlign = 'center'
//       context.textBaseline = 'middle'
//       context.fillStyle = 'rgba(255, 255, 255, 1.0)'
//       context.fillText('Fuck It All', width / 2, height / 2)
//       this.texture = new THREE.CanvasTexture(canvas)
//       this.texture.needsUpdate = false
//       this.createMaterial()
//     },
//     createMaterial() {
//       this.material = new RawShaderMaterial({
//         uniforms: {
//           texture: {
//             type: 't',
//             value: this.texture
//           },
//           uTime: {
//             value: this.time
//           },
//           nScale: {
//             type: 'fv',
//             value: [3, 3]
//           }
//         },
//         vertexShader: vertexSource,
//         fragmentShader: fragmentSource,
//         transparent: true
//       })
//       this.createGeometry()
//     },
//     createGeometry() {
//       this.geometry = new THREE.PlaneBufferGeometry(
//         1,
//         1,
//         1,
//         1
//       )
//       this.scene.add(this.material, this.geometry)
//     },
//     bindWindowEvents() {
//       window.addEventListener('resize', this.handleWindowResize, false)
//     },
//     handleWindowResize() {
//       this.camera.aspect = window.innerWidth / window.innerHeight
//     },
//     startScene() {
//       if (this.started) return
//       this.renderScene()
//       this.started = !this.started
//     },
//     renderScene() {
//       requestAnimationFrame(this.renderScene)
//       this.renderer.render(this.scene, this.camera)
//       this.camera.updateProjectionMatrix()
//       this.renderer.setSize(window.innerWidth, window.innerHeight)
//       this.time += 0.008
//     }
//   }
// }
// </script>

// <style lang="scss" scoped>

// </style>

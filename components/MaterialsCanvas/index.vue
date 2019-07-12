<template lang="pug">
  <canvas id="drawing-canvas" height="128" width="128"></canvas>
</template>

<script>
import {
  BoxBufferGeometry,
  CanvasTexture,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  Vector2,
  WebGLRenderer
} from 'three'

export default {
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      material: null,
      paint: false,
      drawStartPos: new Vector2()
    }
  },
  mounted() {
    this.init()
    this.setupCanvasDrawing()
    this.animate()
  },
  methods: {
    init() {
      this.camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 2000)
      this.camera.position.z = 500
      this.scene = new Scene()
      this.material = new MeshBasicMaterial()
      this.mesh = new Mesh(new BoxBufferGeometry(200, 200, 200), this.material)
      this.scene.add(this.mesh)
      this.renderer = new WebGLRenderer({ antialias: true })
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      document.body.appendChild(this.renderer.domElement)
      window.addEventListener('resize', this.onWindowResize, false)
    },
    setupCanvasDrawing() {
      const drawingCanvas = document.getElementById('drawing-canvas')
      const drawingContext = drawingCanvas.getContext('2d')

      drawingContext.fillStyle = '#FFFFFF'
      drawingContext.fillRect(0, 0, 128, 128)

      this.material.map = new CanvasTexture(drawingCanvas)

      drawingCanvas.addEventListener('mousedown', function (e) {
        this.paint = true
        this.drawStartPos.set(e.offsetX, e.offsetY)
      })
      drawingCanvas.addEventListener('mousemove', function (e) {
        if (this.paint) this.draw(drawingContext, e.offsetX, e.offsetY)
      })
      drawingCanvas.addEventListener('mouseup', function () {
        this.paint = false
      })
      drawingCanvas.addEventListener('mouseleave', function () {
        this.paint = false
      })
    },
    draw(drawContext, x, y) {
      drawContext.moveTo(this.drawStartPos.x, this.drawStartPos.y)
      drawContext.strokeStyle = '#000000'
      drawContext.lineTo(x, y)
      drawContext.stroke()
      this.drawStartPos.set(x, y)
      this.material.map.needsUpdate = false
    },
    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    },
    animate() {
      requestAnimationFrame(this.animate)
      this.mesh.rotation.x += 0.01
      this.mesh.rotation.y += 0.01
      this.renderer.render(this.scene, this.camera)
    }
  }
}
</script>

<style lang="scss" scoped>
body {
  margin: 0;
  background-color: #000;
  color: #fff;
  font-family: Monospace;
  font-size: 13px;
  line-height: 24px;
}

a {
  color: #ff0;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

button {
  cursor: pointer;
  text-transform: uppercase;
}

canvas {
  display: block;
}

#info {
  position: absolute;
  top: 0px;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  text-align: center;
  z-index: 1; /* TODO Solve this in HTML */
}

.dg.ac {
  z-index: 2 !important; /* TODO Solve this in HTML */
}
</style>

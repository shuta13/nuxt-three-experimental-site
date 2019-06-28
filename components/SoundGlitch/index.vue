<template>
  <section class="section">
    <div
      id="canvas"
      ref="canvas"
    />
    {{ data }}
  </section>
</template>

<script>
/* eslint-disable */
import * as THREE from 'three'
import { EffectComposer, RenderPass, GlitchPass, MaskPass, ShaderPass, CopyShader, DigitalGlitch, BloomPass } from 'three-full'
import Music from 'https://did0es-experimental-site.netlify.com/audio/WATEVA - Ber Zer Ker [NCS Release].mp3'
import { Audio } from 'three'
import axios from 'axios'

export default {
  components: {},
  data() {
    return {
      data: undefined,
      scene: undefined,
      camera: undefined,
      object: undefined,
      renderer: undefined,
      composer: undefined,
      renderPass: undefined,
      glitchPass: undefined,
      customPass: undefined,
      effectGlitch: undefined,
      audio: undefined,
      soundData: undefined,
      flag: false,
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

    loadSound() {
      // ここだと見えてる
      // this.flag = true

      const localFlag = false;
      const context = new AudioContext()

      // fftしたかった
      const analyser = context.createAnalyser()
      analyser.fftSize = 2048

      // axiosにおきかえたいおきもち
      // const xhr = new XMLHttpRequest()
      // xhr.responseType = 'arraybuffer'
      // xhr.open('GET', DyroAlive, true)
      // xhr.onload = function() {
      //   const arrayBuffer = xhr.response
      //   decode(arrayBuffer)
      // }
      // xhr.send()
      
      // axiosにおきかえた
      const load = async () => {
        await axios.get(Music, { responseType: 'arraybuffer' })
        .then(res => {
          decode(res.data)
        })
        .catch(err => {
          console.log('error:', err)
        }) 
      }

      load()

      const decode = ((arrayBuffer) => {
        context.decodeAudioData(arrayBuffer, (audioBuffer) => {
          let localFlag = false
          const source = context.createBufferSource()
          source.buffer = audioBuffer
          source.connect(context.destination)
          source.connect(analyser)
          source.start(0)
          goMad(analyser)
        })
      })

      const goMad = (analyser => {
        const bufferLength = analyser.frequencyBinCount
        const dataArray = new Uint8Array(analyser.fftSize)
        analyser.getByteFrequencyData(dataArray)
        for (let i = 0; i < bufferLength; i++) {
          if (dataArray) {
            　
          }
        }
      })

      // this.flag = false
  
      
      // const context = new AudioContext() 
      // const analyser = context.createAnalyser()
      // const src = context.createBufferSource()
      // const req = new XMLHttpRequest()
      // req.open('GET', DyroAlive, true)
      // req.responseType = 'arraybuffer'
      // req.send()
      // req.onload = function() {
      //   const res = req.response
      //   context.decodeAudioData(res, buf => {
      //     src.buffer = buf
      //   })
      // }
      //
      // src.connect(context.destination)
      // analyser.connect(context.destination)
      // analyser.fftSize = 2048
      // const bufferLength = analyser.frequencyBinCount
      // const frequency = new Uint8Array(bufferLength)
      // analyser.getByteFrequencyData(frequency)
      // for (let i = 0; i < bufferLength; i++) {
      //   if (frequency[i]) {
      //     this.flag = true
      //   }
      // }
      //
      // setTimeout(() => {
      //   src.start(0)
      // }, 1000)

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
      
      this.effectGlitch = new GlitchPass(60)
      // trueになるとワイルドになる
      this.effectGlitch.goWild = this.flag

      let that = this
      const firstGlitchStart = 82240
      // グリッジ開始01
      setTimeout(() => {
        that.effectGlitch.goWild = !that.effectGlitch.goWild
      }, firstGlitchStart)

      // グリッジ終01
      setTimeout(() => {
        that.effectGlitch.goWild = !that.effectGlitch.goWild
      }, firstGlitchStart+28000)

      // グリッジ開始02
      setTimeout(() => {
        that.effectGlitch.goWild = !that.effectGlitch.goWild
      }, firstGlitchStart+84000)

      // グリッジ終
      setTimeout(() => {
        that.effectGlitch.goWild = !that.effectGlitch.goWild
      }, firstGlitchStart+112000)

      // if (this.audio.volume) {
      //   this.effectGlitch.goWild = true
      // }
      this.effectGlitch.renderToScreen = true

      this.composer.addPass(this.effectGlitch)
    },

    controlGlitch() {
      setTimeout(() => {
        this.flag = true
      }, 1000)
    },

    startScene() {
      if (this.started) return

      this.loadSound()
      this.createObj()
      this.postProcessing()
      this.controlGlitch()
      
      this.renderScene()

      this.started = !this.started
    },

    renderScene() {
      window.RAF = requestAnimationFrame(this.renderScene)
      // this.volume = this.audio.volume
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

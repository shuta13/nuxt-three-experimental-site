<template>
  <div>
    <h1>Container Pivot</h1>
    Reference:
    <a
      href="https://pixijs.io/examples/#/basics/container-pivot.js"
      target="_blank"
    >
      <cite>https://pixijs.io/examples/#/basics/container-pivot.js</cite>
    </a>
    <blockquote id="pixi" />
  </div>
</template>

<script>
import PIXI from 'pixi.js'

export default {
  mounted: function () {
    const BASE_URL = this.$router.options.base
    const app = new PIXI.Application(800, 600, { backgroundColor: 0x1099bb })
    document.getElementById('pixi').appendChild(app.view)

    const container = new PIXI.Container()

    app.stage.addChild(container)

    // Create a new texture
    const texture = PIXI.Texture.fromImage(
      `${BASE_URL}container-pivot/santa.gif`
    )

    // Create a 5x5 grid of bunnies
    for (let i = 0; i < 25; i++) {
      const bunny = new PIXI.Sprite(texture)
      bunny.anchor.set(0.5)
      bunny.x = (i % 5) * 40
      bunny.y = Math.floor(i / 5) * 40
      container.addChild(bunny)
    }

    // Move container to the center
    container.x = app.screen.width / 2
    container.y = app.screen.height / 2

    // Center bunny sprite in local container coordinates
    container.pivot.x = container.width / 2
    container.pivot.y = container.height / 2

    // Listen for animate update
    app.ticker.add(function (delta) {
      // rotate the container!
      // use delta to create frame-independent transform
      container.rotation -= 0.01 * delta
    })
  }
}
</script>

<style></style>

import NuxtConfiguration from '@nuxt/config'
import pkg from './package.json'

const config: NuxtConfiguration = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  manifest: {
    name: 'description',
    content: pkg.description
  },
  head: {
    title: pkg.name,
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=DM+Sans&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Ubuntu&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Noto+Serif+JP&display=swap' }
    ]
  },
  meta: {
    charset: 'utf-8',
    name: 'viewport',
    content: 'width=device-width, initial-scale=1',
    hid: 'description'
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    loaders: [{
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      use: 'file-loader'
    }],
    extend(config, { isDev, isClient }) {
      if (config.module === undefined) return
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        use: 'file-loader',
        exclude: /(node_modules)/
      })
      config.module.rules.push({
        test: /\.glsl$/,
        use: {
          loader: 'webpack-glsl-loader'
        },
        exclude: /(node_modules)/
      })
      // Run ESLint on save
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(ts|js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

export default config

// legacy code
// export default {
//   mode: 'universal',

//   /*
//   ** Headers of the page
//   */
//   head: {
//     title: pkg.name,
//     meta: [
//       { charset: 'utf-8' },
//       { name: 'viewport', content: 'width=device-width, initial-scale=1' },
//       { hid: 'description', name: 'description', content: pkg.description }
//     ],
//     link: [
//       { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
//       { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=DM+Sans&display=swap' },
//       { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Ubuntu&display=swap' }
//     ]
//   },

//   /*
//   ** Customize the progress-bar color
//   */
//   loading: { color: '#fff' },

//   /*
//   ** Global CSS
//   */
//   css: [
//   ],

//   /*
//   ** Plugins to load before mounting the App
//   */
//   plugins: [
//   ],

//   /*
//   ** Nuxt.js modules
//   */
//   modules: [
//   ],

//   /*
//   ** Build configuration
//   */
//   build: {
//     /*
//     ** You can extend webpack config here
//     */
//     loaders: [{
//       test: /\.(ogg|mp3|wav|mpe?g)$/i,
//       use: 'file-loader'
//     }],
//     extend(config, { isDev, isClient }) {
//       config.module.rules.push({
//         test: /\.(ogg|mp3|wav|mpe?g)$/i,
//         use: 'file-loader',
//         exclude: /(node_modules)/
//       })
//       config.module.rules.push({
//         test: /\.glsl$/,
//         use: {
//           loader: 'webpack-glsl-loader'
//         },
//         exclude: /(node_modules)/
//       })
//       // Run ESLint on save
//       if (isDev && isClient) {
//         config.module.rules.push({
//           enforce: 'pre',
//           test: /\.(js|vue)$/,
//           loader: 'eslint-loader',
//           exclude: /(node_modules)/
//         })
//       }
//     }
//   }
// }

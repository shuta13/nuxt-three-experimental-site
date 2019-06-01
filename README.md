# nuxt-three-sample
nuxt + threeのボイラープレート的なもの
### 参考
https://github.com/tetreault/nuxt-threejs-webgl-experiments
### ディレクトリ構成(ほぼnuxtまんま)
```text
├── README.md
├── assets
│   └── README.md
├── components
│   ├── Hoge.vue // threejsのコード入りコンポーネント
│   ├── Logo.vue
│   └── README.md
├── jest.config.js
├── layouts
│   ├── README.md
│   └── default.vue
├── middleware
│   └── README.md
├── nuxt.config.js
├── package-lock.json
├── package.json
├── pages
│   ├── README.md
│   // ディレクトリ名=routeになるように切る
│   ├── demo
│   │   └── index.vue // components内を読み込む
│   └── index.vue
├── plugins
│   └── README.md
├── static
│   ├── README.md
│   └── favicon.ico
├── store
│   └── README.md
└── test
    └── Logo.spec.js
```
### npm scripts
```text
"scripts": {
  "dev": "eslint --fix --ext .js,.vue --ignore-path .gitignore . && nuxt",
  "build": "nuxt build",
  "start": "nuxt start",
  "generate": "nuxt generate",
  "lint": "eslint --ext .js,.vue --ignore-path .gitignore .",
  "precommit": "npm run lint",
  "test": "jest",
  "tree": "tree -I node_modules"
}
```

const axios = require('axios')
require('dotenv').config()
export default {
  mode: 'universal',
  target: 'static',
  head: {
    title: 'ZYPRESSEN',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'style',
        href:
          'https://cdn.jsdelivr.net/npm/yakuhanjp@3.3.1/dist/css/yakuhanjp.min.css'
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '//cloud.typenetwork.com/projects/3724/fontface.css/'
      }
    ]
  },
  loading: { color: '#fff' },
  css: [
    { src: '~/assets/stylesheets/reset.css', lang: 'css' },
    { src: '@/assets/stylesheets/style.scss', lang: 'scss' }
  ],
  plugins: [
    // '@/plugins/components.js',
    '@/plugins/day.js',
    '@/plugins/globalMethods.js',
    { src: '@/plugins/components', ssr: false },
    { src: '@/plugins/axios', ssr: false },
    { src: '@/plugins/routerOption.js', ssr: false }
  ],
  buildModules: [
    '@nuxt/components',
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module'
  ],
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources',
    'nuxt-webfontloader',
    'nuxt-user-agent',
    '@bazzite/nuxt-optimized-images'
  ],
  manifest: {
    name: 'ZYPRESSEN',
    lang: 'ja'
  },
  styleResources: {
    scss: ['~/assets/stylesheets/style.scss']
  },
  webfontloader: {
    google: {
      families: ['Noto+Sans+JP:400;500', 'Roboto:400,700']
    }
  },
  optimizedImages: {
    optimizeImages: true
  },
  env: { CMSKEY: process.env.CMSKEY },
  build: {
    extend(config, ctx) {
      if (config.module) {
        config.module.rules.push({
          test: /\.(vert|frag)$/i,
          use: ['raw-loader']
        })
      }
    },
    transpile: ['three', 'gsap']
  },
  components: ['~/components'],
  generate: {
    routes() {
      const posts = axios
        .get('https://zypressen.microcms.io/api/v1/works', {
          headers: { 'X-API-KEY': process.env.CMSKEY }
        })
        .then((res) => {
          return res.data.contents.map((post) => {
            console.log('/works/' + post.id)
            return '/works/' + post.id
          })
        })

      console.log('🏁Generate Finish')
      return Promise.all([posts]).then((values) => {
        return values.join().split(',')
      })
    }
  }
}

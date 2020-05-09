import axios from 'axios'
require('dotenv').config()
const cmskey = process.env.CMSKEY
export default {
  mode: 'universal',
  head: {
    title: process.env.npm_package_name || '',
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
      }
    ]
  },
  loading: { color: '#fff' },

  css: [
    { src: '~/assets/stylesheets/reset.css', lang: 'css' },
    { src: '@/assets/stylesheets/style.scss', lang: 'scss' }
  ],

  plugins: [
    '~plugins/components.js',
    '~plugins/day.js',
    { src: '~/plugins/axios', ssr: false }
  ],

  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/stylelint-module'],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources',
    'nuxt-webfontloader',
    'nuxt-user-agent'
  ],
  styleResources: {
    scss: ['~/assets/stylesheets/style.scss']
  },
  webfontloader: {
    google: {
      families: ['Teko']
    }
  },
  env: {
    cmskey: process.env.CMSKEY
  },
  axios: {},
  build: {
    extend(config, ctx) {},
    transpile: ['three']
  },
  generate: {
    interval: 2000,
    fallback: true,
    async routes() {
      console.log('Generate start')
      console.log('🔑', cmskey)
      const data = await axios.get(
        'https://zypressen.microcms.io/api/v1/works',
        {
          headers: { 'X-API-KEY': cmskey }
        }
      )
      const paginateRes = data.data.contents.map((res) => {
        return {
          route: '/works/' + res.id,
          payload: { data }
        }
      })
      console.table(paginateRes)
      return Promise.all([paginateRes]).then((values) => {
        return [...values[0]]
      })
    }
  }
}

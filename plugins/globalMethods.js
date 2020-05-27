import Vue from 'vue'
import { TweenMax } from 'gsap'

Vue.mixin({
  methods: {
    changeWebp(image) {
      if (this.$ua.browser() === 'Safari') {
        return image
      } else {
        return image + '?fm=webp'
      }
    },
    changeWebpLocal(image) {
      console.log(this.$ua.browser())
      if (this.$ua.browser() === 'Safari') {
        return image
      } else {
        return image + '.webp'
      }
    },
    notScroll() {
      console.log('not scroll')
      const containerClass = document.getElementsByClassName('container')
      const containerClassHeight = containerClass[0].clientHeight
      const windowHeight = window.parent.screen.height
      if (containerClassHeight < windowHeight) {
        TweenMax.set('html,body', { overflow: 'hidden' })
      } else {
        TweenMax.set('html,body', { overflow: 'scroll' })
      }
      window.onresize = () => {
        this.notScroll()
      }
    }
  }
})

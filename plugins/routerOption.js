import EventBus from "~/utils/event-bus"; // eslint-disable-line

export default async ({ app }) => {
  await app.router.afterEach((to, from) => {
    console.log(to.path, from.path)
    // ページ遷移ごとに行いたい処理
    const htmlElement = document.querySelector('html')
    const bodyElement = document.querySelector('body')
    console.log(app.$ua)
    if (to.path === '/' || to.path === '/contact' || to.path === '/works') {
      htmlElement.classList.add('noscroll')
      bodyElement.classList.add('noscroll')
      if (app.$ua.deviceType() === 'smartphone' && to.path === '/works') {
        htmlElement.classList.remove('noscroll')
        bodyElement.classList.remove('noscroll')
      }
    } else {
      htmlElement.classList.remove('noscroll')
      bodyElement.classList.remove('noscroll')
    }
    switch (to.path) {
      case '/':
        EventBus.$emit('moveDefaultPosition')
        break
      case '/works':
        EventBus.$emit('moveModelFadeOut')
        break
      case '/about':
        EventBus.$emit('moveTargetHead')
        break
      case '/contact':
        EventBus.$emit('moveShowBack')
        break
    }
  })
}

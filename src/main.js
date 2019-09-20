import '@babel/polyfill'// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import './bus'
import store from './store' //   把store匯入使用

import Lightbox from 'vue-easy-lightbox'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import VueCurrencyFilter from 'vue-currency-filter'
// 為新增bootstrap套件使用而import，並且需要jquery及popper.js
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import App from './App.vue'
import router from './router'
import VueHead from 'vue-head'

import * as VeeValidate from 'vee-validate'
import zhTW from 'vee-validate/dist/locale/zh_TW'
import VueI18n from 'vue-i18n'

Vue.use(Vuex)
Vue.use(VueHead)
Vue.use(Lightbox)
Vue.use(VueAwesomeSwiper)
Vue.use(VueAxios, axios)

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zhTW'
})
Vue.use(VeeValidate, {
  events: 'input|blur', //  這是為了讓使用者離開該欄位時觸發驗證
  i18n,
  dictionary: {
    zhTW
  }
})

Vue.use(VueCurrencyFilter,
  {
    symbol: '$',
    thousandsSeparator: ',',
    symbolPosition: 'front',
    symbolSpacing: true
  })

require('swiper/dist/css/swiper.css')
// 2.6.0版後須手動引入swiper的css
Vue.config.productionTip = false

// 跨網域
axios.defaults.withCredentials = true

Vue.component('Loading', Loading)
// 全域啟動loading元件
/* eslint-disable no-new */

const IE11RouterFix = {
  methods: {
    hashChangeHandler: function () { this.$router.push(window.location.hash.substring(1, window.location.hash.length)) },
    isIE11: function () { return !!window.MSInputMethodContext && !!document.documentMode }
  },
  mounted: function () { if (this.isIE11()) { window.addEventListener('hashchange', this.hashChangeHandler) } },
  destroyed: function () { if (this.isIE11()) { window.removeEventListener('hashchange', this.hashChangeHandler) } }
}

new Vue({
  store, // 把store加入到應用程式內
  i18n,
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  // 處理routerlink相容性
  mixins: [IE11RouterFix],
  render: function (createElement) {
    if ('-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style) {
      window.addEventListener('hashchange', () => {
        var currentPath = window.location.hash.slice(1)
        if (this.$route.path !== currentPath) {
          this.$router.push(currentPath)
        }
      }, false)
    }
    return createElement(App)
  },
  head: {
    // Meta tags
    meta: [
      { name: 'description', content: 'get Good Design what you deserve' }, // id to replace intead of create element
      // { name: 'application-name', content: 'Name of my application' },
      // Twitter
      // { name: 'twitter:title', content: 'Content Title' },
      // with shorthand
      // { n: 'twitter:description', c: 'Content description less than 200 characters' },
      // ...
      { name: 'keywords', content: 'design, gooddesign, 設計, 好設計, 優質設計, 設計師' },
      // Google+ / Schema.org
      {
        itemprop: 'name', content: 'It will be a pleasure' },
      { itemprop: 'description', content: '提供來自世界各地的好設計' },
      // ...
      // Facebook / Open Graph
      { property: 'fb:title', content: 'GoodDesign' },
      { property: 'og:description', content: '提供來自世界各地的好設計' },
      { property: 'og:type', content: 'website' }
      // with shorthand
      // { p: 'og:image', c: 'https://example.com/image.jpg' },
      // ...
    ],
    // link tags
    link: [
      // { rel: 'canonical', href: 'http://example.com/#!/contact/', id: 'canonical' },
      // { rel: 'author', href: 'author', undo: false }, // undo property - not to remove the element
      // { rel: 'icon', href: require('./path/to/icon-16.png'), sizes: '16x16', type: 'image/png' },
      // // with shorthand
      // { r: 'icon', h: 'path/to/icon-32.png', sz: '32x32', t: 'image/png' },
      // ...
    ],
    script: [
      // { type: 'text/javascript', src: 'cdn/to/script.js', async: true, body: true }, // Insert in body
      // // with shorthand
      // { t: 'application/ld+json', i: '{ "@context": "http://schema.org" }' },
      // // ...
    ],
    style: [
      // { type: 'text/css', inner: 'body { background-color: #000; color: #fff}', undo: false },
      // ...
    ]
  }
})
// router 導航守衛
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // 當下一個頁面需要驗證時request驗證並next()
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
    axios.post(api).then(response => {
      if (response.data.success) {
        console.log(response.data)
        next()
      } else {
        console.log(response.data)
        this.store.dispatch('updateMessage', { message: response.data.message, status: 'mistake' })
      }
    })
  } else {
    next()
  }
  // console.log('to',to,'from',from,'next',next)
  // next();
})

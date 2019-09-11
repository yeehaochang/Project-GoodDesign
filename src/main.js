// The Vue build version to load with the `import` command
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
import VueYoutube from 'vue-youtube'
import App from './App.vue'
import router from './router'

import * as VeeValidate from 'vee-validate'
import zhTW from 'vee-validate/dist/locale/zh_TW'
import VueI18n from 'vue-i18n'

Vue.use(Vuex)
Vue.use(Lightbox)
Vue.use(VueAwesomeSwiper)
Vue.use(VueAxios, axios)
Vue.use(VueYoutube)

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
    thousandsSeparator: '.',
    // fractionCount: 2,
    // fractionSeparator: ',',
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
new Vue({
  store, // 把store加入到應用程式內
  i18n,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
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
      }
    })
  } else {
    next()
  }
  // console.log('to',to,'from',from,'next',next)
  // next();
})

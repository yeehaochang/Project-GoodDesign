import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './bus';

import axios from 'axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VeeValidate from 'vee-validate'
import VueAxios from 'vue-axios'
import 'bootstrap'
import 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import VueCurrencyFilter from 'vue-currency-filter'
import VueYoutube from 'vue-youtube'
import Lightbox from 'vue-easy-lightbox';

Vue.use(Lightbox);
Vue.use(VueAwesomeSwiper);
Vue.use(VueAxios, axios);
Vue.use(VueYoutube);
Vue.use(VeeValidate, {
  // 使INPUTE觸發後欄位外點擊依然有效
  events: 'input|blur',
});
// 載入VeeValidate中文語系
VeeValidate.Validator.localize('zh_TW', zhTW_Validata);

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

// 跨網域
axios.defaults.withCredentials = true;

Vue.config.productionTip = false

Vue.component('Loading', Loading);
// 全域啟動loading元件

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// router 導航守衛
router.beforeEach((to, from, next) => {
  const vm = this;
  if (to.meta.requiresAuth) {
    // 當下一個頁面需要驗證時request驗證並next()
    const api = `${process.env.APIPATH}/api/user/check`;
    axios.post(api).then(response => {
      if (response.data.success) {
        console.log(response.data)
        next();
      } else {
        console.log(response.data)
      }
    });
  } else {
    next();
  }
  // console.log('to',to,'from',from,'next',next)
  // next();

})
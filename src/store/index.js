import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import '../bus'
import productModules from './products'

Vue.use(Vuex)
// Store為大寫
export default new Vuex.Store({
  //  嚴謹模式
  strict: true,
  state: {
    isLoading: false,
    isFavorite: false,
    // Home
    coupopforcustom: {
      code: 'gooddesign',
      title: '限時顧客回饋優惠',
      percent: '90'
    },
    // cart&checkout
    cart: [],
    cartNum: '',
    getTotal: '',
    final_price: '',
    // 後台
    coupons: [],
    orderList: [],
    // Alert
    messages: []
  },
  //  操作動作，包含ajax，不操作資料狀態
  actions: {
    // 第一個參數context為固定的，第二個參數為payload，為外部傳進來，使用者自訂的，翻譯叫：載荷
    updateLoading (context, status) {
      context.commit('LOADING', status)
    },
    addCart ({ dispatch }, payload) {
      dispatch('updateLoading', true)
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      const pushProduct = {
        product_id: payload,
        qty: '1'
      }
      axios.post(api, { data: pushProduct }).then(response => {
        dispatch('getCart')
        dispatch('updateMessage', { message: response.data.message, status: 'correct' })
        dispatch('updateLoading', false)
      })
    },
    getCart (context) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      context.commit('LOADING', true)
      axios.get(api).then(response => {
        context.commit('CART', response.data.data.carts)
        if (response.data.data.carts.length !== 0) {
          context.commit('GETTOTAL', response.data.data.carts)
        }
        context.commit('LOADING', false)
      })
    },
    getCoupons ({ commit, dispatch }, payload = 1) {
      commit('LOADING', true)
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${payload}`
      axios.get(api).then(response => {
        commit('COUPONS', response.data.coupons)
        if (!response.data.success) {
          dispatch('updateMessage', { message: response.data.message, status: 'mistake' })
        }
        commit('LOADING', false)
      })
    },
    removeCoupon ({ commit, dispatch }, payload) {
      commit('LOADING', true)
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${payload}`
      axios.delete(api).then(response => {
        dispatch('getCoupons')
        commit('LOADING', false)
        dispatch('updateMessage', { message: response.data.message, status: 'correct' })
      })
    },
    getOrders ({ commit, dispatch }, payload) {
      commit('LOADING', true)
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${payload}`
      axios.get(api).then(response => {
        commit('ORDERS', response.data.orders)
        if (!response.data.success) {
          dispatch('updateMessage', { message: response.data.message, status: 'mistake' })
        }
        commit('LOADING', false)
      })
    },
    useCounpon ({ commit, dispatch }, payload) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      commit('LOADING', true)
      axios
        .post(api, payload)
        .then(response => {
          if (response.data.success) {
            console.log(this)
            commit('GETFINALPRICE', response.data.data.final_total)
            dispatch('updateMessage', { message: response.data.message, status: 'correct' })
          } else {
            console.log(this)
            dispatch('updateMessage', { message: response.data.message, status: 'mistake' })
          }
          commit('LOADING', false)
        })
    },
    // Alert
    updateMessage (context, payload) {
      const timestamp = Math.floor(new Date() / 1000)
      payload.timestamp = timestamp
      context.commit('ALERTMESSAGE', payload)
      setTimeout(() => {
        context.commit('REMOVEALERTWITHTIMIMG', payload.timestamp)
      }, 5000)
    },
    removeMessage (context, payload) {
      context.commit('REMOVEALERT', payload)
    }
  },
  mutations: {
    // 不可使用非同步
    // 資料一定在此運作
    // 使用常數命名(全部大寫)
    // 第一個參數state操作上方的資料狀態
    LOADING (state, status) {
      state.isLoading = status
    },
    CART (state, payload) {
      state.cart = payload || []
      state.cartNum = payload.length
    },
    GETTOTAL (state, payload) {
      let pricedata = payload.map((item) => {
        return item.total
      })
      state.getTotal = pricedata.reduce((a, b) => a + b)
    },
    COUPONS (state, payload) {
      state.coupons = payload
    },
    ORDERS (state, payload) {
      state.orderList = payload
    },
    GETFINALPRICE (state, payload) {
      state.final_price = payload
    },
    ALERTMESSAGE (state, payload) {
      state.messages.push(payload)
    },
    REMOVEALERT (state, payload) {
      state.messages.splice(payload, 1)
    },
    REMOVEALERTWITHTIMIMG (state, timestamp) {
      state.messages.forEach((item, index) => {
        if (item.timestamp === timestamp) {
          state.messages.splice(index, 1)
        }
      })
    }
  },
  getters: {
    isLoading: state => state.isLoading,
    isFavorite: state => state.isFavorite,
    coupopforcustom: state => state.coupopforcustom,
    origin_products: state => {
      return state.productModules.products.filter((item) => {
        return item.origin_price === item.price
      })
    }
  },
  modules: {
    productModules
  }
})

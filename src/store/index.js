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
    isFileLoading: false,
    isFavorite: false,
    // Home
    coupopforcustom: {
      code: 'gooddesign',
      title: '限時顧客回饋優惠',
      percent: '90'
    },
    ModalDisplay: '',
    // cart&checkout
    cart: [],
    cartNum: 0,
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
    updateFileLoading (context, status) {
      context.commit('FILELOADING', status)
    },
    updateModalDisplay (context, status) {
      context.commit('MODALSIDPLAY', status)
    },
    addCart ({ dispatch }, payload) {
      dispatch('updateFileLoading', true)
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      const pushProduct = {
        product_id: payload.id,
        qty: parseInt(payload.qty)
      }
      axios.post(api, { data: pushProduct }).then(response => {
        dispatch('getCart')
        dispatch('updateMessage', { message: payload.title + ' x ' + payload.qty + ' ' + response.data.message, status: 'correct' })
        dispatch('updateModalDisplay', 'none')
        dispatch('updateFileLoading', false)
      })
    },
    // 取得購物車所有商品(含數量)
    getCart (context) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      // context.commit('LOADING', true)
      axios.get(api).then(response => {
        context.commit('CART', response.data.data.carts)
        if (response.data.data.carts.length !== 0) {
          context.commit('GETTOTAL', response.data.data.carts)
        }
        // context.commit('LOADING', false)
      })
    },
    // 購物車頁面移除單一商品
    removeCartProduct ({ commit, dispatch }, payload) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${payload.id}`
      commit('LOADING', true)
      axios.delete(api).then(response => {
        dispatch('updateMessage', { message: response.data.message + '商品：' + payload.product.title, status: 'correct' })
        dispatch('getCart')
        commit('LOADING', false)
      })
    },
    // 後台優惠券頁面
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
    // 後台訂單
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
    // 結帳頁面使用優惠券
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
    FILELOADING (state, status) {
      state.isFileLoading = status
    },
    CART (state, payload) {
      state.cartNum = payload.length || 0
      state.cart = payload || []
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
    },
    MODALSIDPLAY (state, status) {
      state.ModalDisplay = status
    }
  },
  getters: {
    isLoading: state => state.isLoading,
    isFileLoading: state => state.isFileLoading,
    isFavorite: state => state.isFavorite,
    coupopforcustom: state => state.coupopforcustom,
    ModalDisplay: state => state.ModalDisplay
  },
  modules: {
    productModules
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import '../bus'

Vue.use(Vuex)
// Store為大寫
export default new Vuex.Store({
  //  嚴謹模式
  strict: true,
  state: {
    isLoading: false,
    products: [],
    categoryList: [],
    pagination: [],
    designerlist: [],
    favoProduct: [],
    recentCategory: '',
    filterdata: {},
    isFavorite: false,
    sortValue: '',
    recentDesigner: '',
    searchText: '',
    // Home
    onsale: [],
    coupopforcustom: {
      code: 'gooddesign',
      title: '限時顧客回饋優惠',
      percent: '90'
    },
    // cart&checkout
    cart: [],
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
    // 取得商品列表方法(含分頁)
    getProducts (context, payload = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${payload}`
      context.commit('LOADING', true)
      // dispatch 傳入
      axios.get(api).then(response => {
        let newProd = response.data.products
        context.commit('FAVOPRODUCT', newProd)
        context.commit('CATEGORYLIST', newProd)
        context.commit('DESIGNERLIST', newProd)
        context.commit('PAGINATION', response.data.pagination)
        context.commit('PRODUCTS', newProd)
        context.commit('LOADING', false)
      })
    },
    //  取得過濾後產品列表方法
    getFilterProducts (context, payload) {
      //  參數為sidebar透過emit傳進的選定商品分類
      context.commit('RECENTCATEGORY', payload)
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      context.commit('LOADING', true)
      axios.get(api).then(response => {
        let newProd = response.data.products
        context.commit('FAVOPRODUCT', newProd)
        // 透過點擊傳進來的value篩選出商品分類結果
        if (payload !== '') {
          newProd = newProd.filter(function (item) {
            return item.category === payload
          })
        }
        let len = newProd.length
        // 寫入分頁
        let pagination = {
          current_page: 1,
          has_next: (len > 10),
          has_pre: false,
          total_pages: Math.floor((len - 1) / 10 + 1)
        }
        context.commit('PAGINATION', pagination)
        // context.commit('ONSALE', newProd)
        context.commit('PRODUCTS', newProd)
        context.commit('LOADING', false)
      })
    },
    addFavor (context, payload) {
      context.commit('FAVOPRODUCT', payload)
    },
    getfilter (context, payload) {
      context.commit('FILTERDATA', payload)
    },
    sortType (context, payload) {
      if (payload === 'price') {
        context.commit('SORTVALUE', payload)
      } else {
        context.commit('SORTVALUE')
      }
    },
    getDesigner (context, payload) {
      context.commit('RECENTDESIGNER', payload)
    },
    showFavorite (context) {
      context.commit('ISFAVORITE')
    },
    // 移除過濾標籤
    removeDesigner (context) {
      context.commit('RECENTDESIGNER', '')
    },
    removeCategory (context) {
      context.commit('RECENTCATEGORY', '')
      //   vm.getFilterProducts()
    },
    removeFilter (context) {
      context.commit('FILTERDATA', [])
      //   vm.getFilterProducts()
    },
    removeSort (context) {
      context.commit('SORTVALUE', '')
    },
    removeSearchText (context) {
      context.commit('SEARCHTEXT', '')
    },
    getSearchText (context, payload) {
      context.commit('SEARCHTEXT', payload)
    },
    getCart (context) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      context.commit('LOADING', true)
      axios.get(api).then(response => {
        context.commit('CART', response.data.data.carts)
        context.commit('LOADING', false)
      })
    },
    getCoupons (context, payload) {
      context.commit('LOADING', true)
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${payload}`
      axios.get(api).then(response => {
        context.commit('COUPONS', response.data.coupons)
        if (!response.data.success) {
          // this.$bus.$emit('message:push', response.data.message, 'danger')
          this.updateMessage(response.data.message, 'danger')
        }
        context.commit('LOADING', false)
      })
    },
    getOrders (context, payload) {
      context.commit('LOADING', true)
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${payload}`
      axios.get(api).then(response => {
        context.commit('ORDERS', response.data.orders)
        if (!response.data.success) {
          // this.$bus.$emit('message:push', response.data.message, 'danger')
          this.updateMessage(response.data.message, 'danger')
        }
        context.commit('LOADING', false)
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
            dispatch('updateMessage', { message: response.data.message, status: 'main' })
          } else {
            console.log(this)
            dispatch('updateMessage', { message: response.data.message, status: 'danger' })
          }
          commit('LOADING', false)
        })
    },
    // Alert
    updateMessage (context, payload) {
      context.commit('ALERTMESSAGE', payload)
      setTimeout(() => {
        context.commit('REMOVEALERTWITHTIMIMG', payload.timestamp)
      }, 5000)
    },
    removeMessage (context, payload) {
      context.commit('REMOVEALERT', payload)
      // this.messages.splice(payload, 1)
    }
    // removeMessageWithTiming (context, timestamp) {
    //   // context.commit('REMOVEALERTWITHTIMIMG', timestamp)
    //   setTimeout(() => {
    //     context.commit('REMOVEALERTWITHTIMIMG', timestamp)
    //   }, 1000)
    // }
  },
  mutations: {
    // 不可使用非同步
    // 資料一定在此運作
    // 使用常數命名(全部大寫)
    // 第一個參數state操作上方的資料狀態
    LOADING (state, status) {
      state.isLoading = status
    },
    PRODUCTS (state, payload) {
      // 透過點擊傳進來的value篩選出商品分類結果
      let newArray = payload
      if (state.recentCategory !== '') {
        newArray = newArray.filter(function (item) {
          return item.category === state.recentCategory
        })
      }
      //   價格篩選過濾
      if (state.filterdata.maxprice) {
        newArray = newArray.filter(function (item) {
          return (
            parseInt(item.price) >= parseInt(state.filterdata.minprice) &&
            parseInt(item.price) < parseInt(state.filterdata.maxprice)
          )
        })
      }
      // 過濾搜尋關鍵字
      if (state.searchText !== '') {
        newArray = newArray.filter(function (item) {
          return item.title.match(state.searchText)
        })
      }
      // 過濾我的最愛
      if (state.isFavorite === true) {
        newArray = newArray.filter(function (item) {
          return item.isFavor === true
        })
      }
      //  過濾搜尋金額順序
      if (state.sortValue !== '' && state.sortValue === 'price') {
        newArray = newArray.sort(function (a, b) {
          return a.price - b.price
        })
      }
      //  過濾設計師
      if (state.recentDesigner !== '') {
        newArray = newArray.filter(function (item) {
          return item.description === state.recentDesigner
        })
      }
      //  set
      let stringdata = JSON.stringify(state.favoProduct)
      localStorage.setItem('myFavorite', stringdata)

      state.products = newArray
    },
    CATEGORYLIST (state, payload) {
      let newcategoryList = payload.map(function (item) {
        return item.category
      })
      state.categoryList = newcategoryList.filter(function (item, index, array) {
        return array.indexOf(item) === index
      })
    },
    DESIGNERLIST (state, payload) {
      let newdesignerList = payload.map(function (item) {
        return item.description
      })
      state.designerlist = newdesignerList.filter(function (item, index, array) {
        return array.indexOf(item) === index
      })
    },
    PAGINATION (state, payload) {
      state.pagination = Object.assign({}, payload)
    },
    RECENTCATEGORY (state, payload) {
      state.recentCategory = payload || ''
    },
    FILTERDATA (state, payload) {
      state.filterdata = payload || {}
    },
    ISFAVORITE (state) {
      state.isFavorite = !state.isFavorite
    },
    SORTVALUE (state, payload) {
      state.sortValue = payload
    },
    RECENTDESIGNER (state, payload) {
      state.recentDesigner = payload || ''
    },
    SEARCHTEXT (state, payload) {
      state.searchText = payload || ''
    },
    FAVOPRODUCT (state, payload) {
      if (JSON.parse(localStorage.getItem('myFavorite')) === null) {
        state.favoProduct = []
      } else {
        state.favoProduct = JSON.parse(localStorage.getItem('myFavorite'))
      }
      //  若傳入為陣列，過濾出我的最愛的商品
      if (payload.length !== undefined) {
        payload.forEach((item) => {
          Vue.set(item, 'isFavor', false)
        })
        if (state.favoProduct !== []) {
          let titledata = state.favoProduct.map((item) => {
            return item.title
          })
          payload.forEach((item) => {
            if (titledata.includes(item.title)) {
              item.isFavor = true
            }
          })
        }
        state.onsale = payload.filter((item) => {
          return item.price !== item.origin_price
        })
      } else {
      //  若傳入單一物件，新增或刪除我的最愛
        if (payload.isFavor) {
          payload.isFavor = false
          state.favoProduct.forEach((item, index) => {
            if (payload.title === item.title) {
              state.favoProduct.splice(index, 1)
            }
          })
        } else {
          payload.isFavor = true
          state.favoProduct.push(payload)
        }
        let stringdata = JSON.stringify(state.favoProduct)
        localStorage.setItem('myFavorite', stringdata)
      }
    },
    CART (state, payload) {
      state.cart = payload || []
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
  }
})

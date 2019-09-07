<template>
  <div>
    <Alert></Alert>
    <loading :active.sync="isLoading"></loading>
    <div class="row my-2 no-gutters">
      <div class="col-sm-2 col-0">
        <Sidebar
          @recentCategory="getFilterProducts"
          @recentDesigner="getDesigner"
          :categorybar="categoryList"
          :designerbar="designerlist"
          @recentfilter="getfilter"
          @recentFavorite="showFavorite"
        ></Sidebar>
      </div>
      <div class="col-sm-10 col-12">
        <div class="bg-second text-main p-2 mx-2">商品列表</div>
        <div class="p-3 d-flex">
          <!-- 過濾標籤 -->
          <span class="border rounded p-2 mx-1" v-if="recentCategory">
            <i class="fas fa-times mr-1" @click.prevent="removeCategory"></i>
            {{recentCategory}}
          </span>
          <span class="border rounded p-2 mx-1" v-if="filterdata.maxprice">
            <i class="fas fa-times mr-1" @click.prevent="removeFilter"></i>
            {{filterdata.minprice}}~{{filterdata.maxprice}}
          </span>
          <span class="border rounded p-2 mx-1" v-if="searchText != ''">
            <i class="fas fa-times mr-1" @click.prevent="removeText"></i>
            {{searchText}}
          </span>
          <span class="border rounded p-2 mx-1" v-if="recentDesigner != ''">
            <i class="fas fa-times mr-1" @click.prevent="removeDesigner"></i>
            {{recentDesigner}}
          </span>
          <span class="border rounded p-2 mx-1" v-if="sortvalue != ''">
            <i class="fas fa-times mr-1" @click.prevent="removeSort"></i>
            依金額排序
          </span>
          <div class="nav-item dropdown ml-auto">
            <a
              class="nav-link dropdown-toggle text-first border rounded"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >選擇排序方式</a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a id="price" class="dropdown-item" href="#" @click.prevent="sortType">依金額排序</a>
            </div>
          </div>
        </div>
        <div class="row no-gutters px-2">
          <span class="col-12" v-if="products.length === 0">目前尚無符合搜尋結果的商品。</span>
          <div
            class="col-lg-3 col-md-4 col-sm-6 col-12 card p-2 border border-shadow"
            v-for="item in products"
            :key="item.id"
          >
            <a href="#" @click.prevent="openProduct(item.id)">
              <img :src="item.imageUrl" width="220px" alt class="card-img-top img-fluid" />
            </a>

            <div class="card-title my-2">
              <a href="#" class="text-general" @click.prevent="openProduct(item.id)">{{item.title}}</a>
            </div>
            <span class="text-left">{{item.description}}</span>
            <span class="text-right">
              <i
                class="far fa-heart text-first"
                v-if="item.isFavor != true"
                @click.prevent="addFavor(item)"
              ></i>
              <i
                class="fas fa-heart text-first"
                v-if="item.isFavor === true"
                @click.prevent="addFavor(item)"
              ></i>
            </span>
            <div class="text-left d-flex align-items-end">
              <div v-if="item.price == item.origin_price">{{item.origin_price|currency}}</div>
              <del v-if="item.price !== item.origin_price">{{item.origin_price|currency}}</del>
              <strong class="ml-2" v-if="item.price !== item.origin_price">{{item.price|currency}}</strong>
              <a href="#" class="text-main ml-auto" @click.prevent="addCart(item.id)">
                <i class="fas fa-cart-plus fa-2x"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Pagination :propspage="pagination" @emitpage="getProducts"></Pagination>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar'
import Pagination from '../components/Pagination'
import Alert from '../components/Alert'

export default {
  props: ['info'],
  data () {
    return {
      products: [],
      categoryList: [],
      designerlist: [],
      recentCategory: '',
      recentDesigner: '',
      filterdata: {},
      pagination: {},
      isLoading: false,
      favoProduct: [],
      searchText: '',
      isFavorite: false,
      sortvalue: ''
    }
  },
  components: {
    Alert,
    Sidebar,
    Pagination
  },
  methods: {
    // 取得產品列表(含page)
    getProducts (page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`
      const vm = this
      vm.isLoading = true
      this.$http.get(api).then(response => {
        let newProd = response.data.products
        //
        vm.putFavorite(newProd)
        vm.products = newProd
        let newcategoryList = newProd.map(function (item) {
          return item.category
        })
        vm.categoryList = newcategoryList.filter(function (item, index, array) {
          return array.indexOf(item) === index
        })

        let newdesignerList = newProd.map(function (item) {
          return item.description
        })
        vm.designerlist = newdesignerList.filter(function (item, index, array) {
          return array.indexOf(item) === index
        })
        vm.pagination = Object.assign({}, response.data.pagination)
        vm.isLoading = false
      })
    },
    // 開啟單一產品頁面
    openProduct (id) {
      // let params = { title: 'test' }
      let routerPush = this.$router.push({
        path: '/productpage',
        query: { id: id }
      })
      console.log(routerPush)
    },
    // 該商品加入購物車
    addCart (id) {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      const pushProduct = {
        product_id: id,
        qty: '1'
      }
      vm.$http.post(api, { data: pushProduct }).then(response => {
        vm.$bus.$emit('addCart')
        vm.$bus.$emit('message:push', response.data.message, 'main')
        vm.isLoading = false
      })
    },
    //  取得過濾後產品列表方法
    getFilterProducts (value = this.recentCategory) {
      // 參數為sidebar透過emit傳進的選定商品分類
      this.recentCategory = value
      const text = this.$route.query.t
      this.searchText = this.$route.query.t
      // this.$route.query.t = ';
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      const vm = this
      vm.isLoading = true
      this.$http.get(api).then(response => {
        let newProd = response.data.products
        vm.putFavorite(newProd)
        // 透過點擊傳進來的value篩選出商品分類結果
        if (this.recentCategory !== '') {
          newProd = newProd.filter(function (item) {
            return item.category === value
          })
        }
        // 價格篩選過濾
        if (vm.filterdata.maxprice) {
          newProd = vm.filterMethod(newProd)
        }
        // 過濾搜尋關鍵字
        if (text !== '') {
          newProd = newProd.filter(function (item) {
            return item.title.match(text)
          })
        }
        // 過濾我的最愛
        if (vm.isFavorite === true) {
          newProd = newProd.filter(function (item) {
            return item.isFavor === true
          })
        }
        // 過濾搜尋金額順序
        if (vm.sortvalue !== '') {
          newProd = vm.sortMethod(newProd)
        }
        // 過濾設計師
        if (vm.recentDesigner !== '') {
          newProd = newProd.filter(function (item) {
            return item.description === vm.recentDesigner
          })
        }
        vm.products = newProd

        let len = vm.products.length
        // 寫入分頁
        vm.pagination = {
          current_page: 1,
          has_next: (len > 10),
          has_pre: false,
          total_pages: Math.floor((len - 1) / 10 + 1)
        }
        vm.isLoading = false
      })
    },
    // 價格篩選過濾的方法
    filterMethod (data) {
      const vm = this
      // console.log('在此過濾資料',data,vm.filterdata.minprice,vm.filterdata.maxprice)
      let newdata = data.filter(function (item) {
        return (
          parseInt(item.price) >= parseInt(vm.filterdata.minprice) &&
          parseInt(item.price) < parseInt(vm.filterdata.maxprice))
      })
      return newdata
    },
    getfilter (data) {
      const vm = this
      vm.filterdata = data
      vm.getFilterProducts(vm.recentCategory)
    },
    getDesigner (item) {
      const vm = this
      vm.recentDesigner = item
      vm.getFilterProducts(vm.recentCategory)
    },
    // 加入我的最愛
    addFavor (e) {
      const vm = this
      vm.favoProduct = vm.favoProduct || []
      if (e.isFavor) {
        e.isFavor = false
        vm.favoProduct.forEach(function (item, index, array) {
          if (item.title === e.title) {
            array.splice(index, 1)
          }
        })
        vm.setFavorite()
      } else {
        vm.$set(e, 'isFavor', true)
        vm.favoProduct.push(e)
        vm.setFavorite()
      }
      vm.$bus.$emit('addHeart')
      vm.getFavorite()
    },
    setFavorite () {
      let stringdata = JSON.stringify(this.favoProduct)
      localStorage.setItem('myFavorite', stringdata)
    },
    getFavorite () {
      this.favoProduct = JSON.parse(localStorage.getItem('myFavorite'))
    },
    putFavorite (data) {
      // 過濾data中包含localstorage的資料並重新set:isfavor
      const vm = this
      vm.favoProduct = vm.favoProduct || []
      let titledata = vm.favoProduct.map(function (item) {
        return item.title
      })
      data.forEach(function (item, index, array) {
        if (titledata.includes(item.title)) {
          vm.$set(item, 'isFavor', true)
        }
      })
    },
    // 移除過濾標籤
    removeDesigner () {
      const vm = this
      vm.recentDesigner = ''
      vm.getFilterProducts()
    },
    removeText () {
      const vm = this
      vm.searchText = ''
      vm.$route.query.t = ''
      vm.getFilterProducts()
    },
    removeCategory () {
      const vm = this
      vm.recentCategory = ''
      vm.getFilterProducts()
    },
    removeFilter () {
      const vm = this
      vm.filterdata = ''
      vm.getFilterProducts()
    },
    removeSort () {
      const vm = this
      vm.sortvalue = ''
      vm.getFilterProducts()
    },
    // 切換是否顯示我的最愛
    showFavorite () {
      this.isFavorite = !this.isFavorite
      this.getFilterProducts()
    },
    // 將參數值傳到資料上
    sortType (event) {
      const vm = this
      let value = event.currentTarget.id
      console.log(value)
      if (value === 'price') {
        vm.sortvalue = value
        vm.getFilterProducts()
      }
    },
    // 排序過濾方法
    sortMethod (data) {
      const vm = this
      if (vm.sortvalue === 'price') {
        data = data.sort(function (a, b) {
          return a.price - b.price
        })
      }
      return data
    }
  },
  created () {
    this.$bus.$on('getFilterProducts', this.getFilterProducts)
    this.getFavorite()
    this.getProducts()
    this.$route.query.t = ''
    this.filterdata = {}
    this.recentCategory = ''
  }
}
</script>

<style lang="scss" scoped>
.card-img-top {
  max-height: 140px;
  object-fit: cover;
}
.card-img-top:hover {
  opacity: 0.5;
}
strong {
  font-size: 24px;
}
.fa-cart-plus,
.fa-heart {
  font-size: 26px;
}
div,
a {
  font-family: inherit;
}
.cardshadow {
  border: none;
  box-shadow: 1px 1px 2px $shadow;
}
</style>

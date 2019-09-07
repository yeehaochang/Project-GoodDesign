<template>
  <div>
    <Alert></Alert>
    <loading :active.sync="isLoading"></loading>
    <div class="container p-0 mt-2">
      <div class="row no-gutters">
        <div class="col-md-7">
          <a href="#" @click.prevent="showSingle(product.imageUrl)">
            <img
            :src="product.imageUrl"
            class="img-fluid border rounded p-2"
          />
          </a>
          <VueEasyLightbox :visible="visible" :imgs="imgs" :index="index" @hide="handleHide"></VueEasyLightbox>
          <div class="text-left px-2 py-4">
            <table>
              <tbody>
                <tr>
                  <td width="60">
                    <span>Designby：</span>
                  </td>
                  <td>{{product.description}}</td>
                </tr>
                <tr>
                  <td>
                    <span>商品介紹：</span>
                  </td>
                  <td>{{product.content}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-md-5 d-flex">
          <div class="my-auto w-100 border rounded p-2">
            <div class="text-left">
              <span class="h2">{{product.title}}</span>

              <i
                class="far fa-heart ml-1 fa-2x text-first"
                v-if="product.isFavor != true"
                @click.prevent="addFavor()"
              ></i>
              <i
                class="fas fa-heart ml-1 fa-2x text-first"
                v-if="product.isFavor === true"
                @click.prevent="addFavor()"
              ></i>
            </div>

            <div class="text-right" style="font-size:30px;">{{product.price|currency}}</div>
            <div class="input-group my-3">
              <label class="m-0 p-2" id="qty" for="num">數量</label>
              <select
                type="number"
                class="custom-select"
                @change="gettotal"
                v-model="product.qty"
                id="num"
              >
                <option :value="item" v-for="item in 10" :key="item">{{item}}</option>
              </select>
            </div>
            <div class="text-right mb-1 mx-1">
              商品庫存僅剩
              <span class="text-danger mx-1">{{10 - product.qty}}</span>
              {{product.unit}}
            </div>
            <div class="row no-gutters">
              <div class="col-md-6">
                <div class="p-2 text-left">小計：{{total|currency}}</div>
              </div>
              <div class="col-md-6">
                <a href="#" class="p-2 btn btn-main d-block" @click.prevent="addCart">
                  <span>加入購物車</span>
                  <i class="fas fa-cart-plus"></i>
                </a>
              </div>
            </div>
            <div class="border rounded text-left p-2 mt-2">
              <p>
                付款後，從備貨到寄出商品為 5 個工作天。（不包含假日）
                <br />設計館符合免辦理營業登記，無需開立統一發票。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Alert from '../components/Alert'
import VueEasyLightbox from 'vue-easy-lightbox'

export default {
  components: {
    Alert,
    VueEasyLightbox
  },
  data () {
    return {
      productId: '',
      product: {},
      total: '',
      favoProduct: [],
      imgs: '',
      visible: false,
      index: 0
    }
  },
  methods: {
    getProduct () {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${vm.productId}`
      this.$http.get(api).then(response => {
        vm.product = response.data.product
        this.putPageFavorite(vm.product)
        vm.product.qty = 1
        vm.isLoading = false
        vm.total = vm.product.price
      })
    },
    addCart () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      const vm = this
      vm.isLoading = true
      const pushProduct = {
        product_id: vm.product.id,
        qty: vm.product.qty
      }
      vm.$http.post(api, { data: pushProduct }).then(response => {
        this.$bus.$emit('addCart')
        this.$bus.$emit('message:push', response.data.message, 'main')
        vm.isLoading = false
      })
    },
    gettotal () {
      this.total = parseInt(this.product.qty) * parseInt(this.product.price)
    },
    getFavorite () {
      this.favoProduct = JSON.parse(localStorage.getItem('myFavorite'))
    },
    setFavorite () {
      let stringdata = JSON.stringify(this.favoProduct)
      localStorage.setItem('myFavorite', stringdata)
    },
    putPageFavorite (e) {
      this.favoProduct = JSON.parse(localStorage.getItem('myFavorite'))
      const vm = this
      vm.favoProduct = vm.favoProduct || []
      let titledata = vm.favoProduct.map(function (item) {
        return item.title
      })
      if (titledata.includes(e.title)) {
        vm.$set(e, 'isFavor', true)
      }
    },
    addFavor () {
      const vm = this
      vm.favoProduct = vm.favoProduct || []
      if (vm.product.isFavor) {
        vm.product.isFavor = false
        vm.favoProduct.forEach(function (item, index, array) {
          if (item.title === vm.product.title) {
            array.splice(index, 1)
          }
        })
        vm.setFavorite()
      } else {
        vm.$set(vm.product, 'isFavor', true)
        vm.favoProduct.push(vm.product)
        vm.setFavorite()
      }
      vm.$bus.$emit('addHeart')
      vm.getFavorite()
    },
    // 燈箱效果
    showSingle (url) {
      this.imgs = url
      this.show()
    },
    showMultiple () {
      this.imgs = this.imgArray
      this.index = 1 // index of imgList
      this.show()
    },
    show () {
      this.visible = true
    },
    handleHide () {
      this.visible = false
    }
  },
  created () {
    this.productId = this.$route.query.id
    this.getProduct()
  },
  mounted () {
    this.gettotal()
  }
}
</script>

<style lang="scss" scoped>
img {
  height: 500px;
  object-fit: cover;
}
</style>

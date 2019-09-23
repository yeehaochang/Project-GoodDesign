<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container my-4">
      <div class="row no-gutters">
        <div class="col-md-7 bg-secondary p-3">
          <a href="#" @click.prevent="showSingle(product.imageUrl)">
            <img
            :src="product.imageUrl"
            class="img-fluid border rounded p-2"
          />
          </a>
          <VueEasyLightbox :visible="visible" :imgs="imgs" :index="index" @hide="handleHide"></VueEasyLightbox>
          <div class="text-left p-3">
            <table>
              <tbody>
                <tr>
                  <td width="60">
                    <span>Designby：</span>
                  </td>
                  <td>
                    <span>{{product.description}}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>商品介紹：</span>
                  </td>
                  <td>
                    <span>{{product.content}}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-md-5 d-flex">
          <div class="my-auto w-100 right_form_border p-3">
            <div class="text-left">
              <span class="h2 text-general">{{product.title}}</span>
              <i
                class="far fa-heart p-1 fa-2x text-primary"
                v-if="product.isFavor != true"
                @click.prevent="addFavor()"
              ></i>
              <i
                class="fas fa-heart ml-1 fa-2x text-primary"
                v-if="product.isFavor === true"
                @click.prevent="addFavor()"
              ></i>
            </div>

            <div class="text-right" style="font-size:30px;">{{product.price|currency}}</div>
            <div class="input-group my-4">
              <label class="m-0 p-2" id="qty" for="num">
                <span>數量</span></label>
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
            <div class="text-right pt-5">
              <span>商品庫存僅剩</span>
              <span class="text-mistake px-1">{{10 - product.qty}}</span>
              <span>{{product.unit}}</span>
            </div>
            <div class="row no-gutters my-3">
              <div class="col-md-6">
                <div class="p-2 text-left"><span>小計：{{total|currency}}</span></div>
              </div>
              <div class="col-md-6">
                <a href="#" class="p-2 btn btn-primary d-block" @click.prevent="addCart">
                  <i class="fas fa-circle-notch fa-spin mr-1" v-if="isFileLoading"></i>
                  <span>加入購物車</span>
                </a>
              </div>
            </div>
            <div class="border border-primary rounded text-left p-2 mt-2">
              <span>
                付款後，從備貨到寄出商品為 5 個工作天。（不包含假日）
                <br />設計館符合免辦理營業登記，無需開立統一發票。
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueEasyLightbox from 'vue-easy-lightbox'

export default {
  components: {
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
      index: 0,
      isPaying: false
    }
  },
  methods: {
    getProduct () {
      const vm = this
      vm.$store.dispatch('updateLoading', true)
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${vm.productId}`
      this.$http.get(api).then(response => {
        vm.product = response.data.product
        this.putPageFavorite(vm.product)
        vm.product.qty = 1
        vm.$store.dispatch('updateLoading', false)
        vm.total = vm.product.price
      })
    },
    addCart () {
      if (this.isPaying === false && this.isFileLoading === false) {
        this.isPaying = true
        this.$store.dispatch('addCart', this.product)
      }
    },
    gettotal () {
      this.total = parseInt(this.product.qty) * parseInt(this.product.price)
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
      this.$store.dispatch('addFavor', this.product)
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
  watch: {
    isFileLoading () {
      if (this.isFileLoading === false) {
        this.isPaying = false
      }
    }
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    },
    isFileLoading () {
      return this.$store.state.isFileLoading
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
span {
  font-size: 16px;
  font-weight: 700;
}
.right_form_border {
  border: 10px $secondary solid;
  border-left:none;
  @media (max-width:768px) {
    border-left: 10px $secondary solid;
  }
}
</style>

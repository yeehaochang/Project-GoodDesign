<template>
  <div class="container p-0">
    <loading :active.sync="isLoading"></loading>
    <div class="row mb-2 no-gutters">
      <div class="col-md-3">
        <Sidebar
          @recentCategory="getFilterProducts"
          @recentDesigner="getDesigner"
          :categorybar="categoryList"
          :designerbar="designerlist"
          @recentfilter="getfilter"
          @recentFavorite="showFavorite"
        ></Sidebar>
      </div>
      <div class="col-md-9">
        <div class="bg-secondary text-primary p-2 mx-2">商品列表</div>
        <div class="p-3 d-flex">
          <!-- 過濾標籤 -->
          <span class="border rounded p-2 mx-1" v-if="recentCategory">
            <i class="fas fa-times mr-1" @click.prevent="removeCategory"></i>
            {{recentCategory}}
          </span>
          <span class="border rounded p-2 mx-1" v-if="filterdata.maxprice">
            <i class="fas fa-times mr-1" @click.prevent="removeFilter"></i>
            金額：{{filterdata.minprice}} ~ {{filterdata.maxprice}}
          </span>
          <span class="border rounded p-2 mx-1" v-if="searchText != ''">
            <i class="fas fa-times mr-1" @click.prevent="removeSearchText"></i>
            {{searchText}}
          </span>
          <span class="border rounded p-2 mx-1" v-if="recentDesigner != ''">
            <i class="fas fa-times mr-1" @click.prevent="removeDesigner"></i>
            設計師：{{recentDesigner}}
          </span>
          <span class="border rounded p-2 mx-1" v-if="sortValue === 'price'">
            <i class="fas fa-times mr-1" @click.prevent="removeSort"></i>
            依金額排序
          </span>
          <div class="nav-item dropdown ml-auto">
            <a
              class="nav-link dropdown-toggle text-primary border rounded"
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
          <div class="col" v-if="products.length === 0">目前尚無符合搜尋結果的商品。</div>
          <!-- 商品 -->
          <div
            class="col-lg-3 col-md-4 col-sm-6 card p-2 product_card"
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
            <span class="text-right heartSpan">
              <i
                class="far fa-heart text-primary"
                v-if="item.isFavor !== true"
                @click.prevent="addFavor(item)"
              ></i>
              <i
                class="fas fa-heart text-primary"
                v-if="item.isFavor === true"
                @click.prevent="addFavor(item)"
              ></i>
            </span>
            <div class="text-left d-flex align-items-end">
              <strong v-if="item.price == item.origin_price">{{item.origin_price|currency}}</strong>
              <del v-if="item.price !== item.origin_price">{{item.origin_price|currency}}</del>
              <strong class="ml-2" v-if="item.price !== item.origin_price">{{item.price|currency}}</strong>
              <a href="#" class="text-general ml-auto" @click.prevent="addCartModal(item)">
                <i class="fas fa-cart-plus fa-2x"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal -->
      <div class="modal fade" id="ProductModal" style="top:250px;" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header bg-primary text-common">
              <h5 class="modal-title" id="exampleModalLabel">{{addCartTemplate.title}}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click.prevent="cleanTemplate()">
                <span class="text-secondary" aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row no-gutters">
                <div class="col-md-6">
                  <img :src="addCartTemplate.imageUrl" width="150" height="120">
                </div>
                <div class="col-md-6">
                  <div class="text-left pb-2">類型：{{addCartTemplate.category}}</div>
                  <div class="text-left pb-2">設計師：{{addCartTemplate.description}}</div>
                  <div class="input-group">
                    <select class="custom-select" id="inputGroupSelect01" v-model="addCartTemplate.qty">
                    <option v-for="item in 10" :key="item">{{item}}</option>
                  </select>
                  <span class="p-2">{{addCartTemplate.unit}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <i class="fas fa-circle-notch fa-spin" v-if="isFileLoading"></i>
              <button type="button" class="btn btn-general" data-dismiss="modal" @click.prevent="cleanTemplate()">取消</button>
              <button id="addCartButton" type="button" class="btn btn-primary" @click.prevent="addCart(addCartTemplate)">加入購物車</button>
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
import { mapGetters, mapActions } from 'vuex'
import $ from 'jquery'
export default {
  props: ['info'],
  data () {
    return {
      addCartTemplate: {
      }
    }
  },
  components: {
    Sidebar,
    Pagination
  },
  methods: {
    // 取得產品列表(含page)
    getProducts (page = 1) {
      this.$store.dispatch('getProducts', page)
    },
    // 開啟單一產品頁面
    openProduct (id) {
      this.$router.push({
        path: '/productpage',
        query: { id: id }
      })
    },
    //  取得過濾後產品列表方法
    getFilterProducts (value = this.recentCategory) {
      this.$store.dispatch('getFilterProducts', value)
    },
    getfilter (data) {
      this.$store.dispatch('getfilter', data)
    },
    getDesigner (item) {
      this.$store.dispatch('getDesigner', item)
    },
    // 加入我的最愛
    addFavor (e) {
      this.$store.dispatch('addFavor', e)
      this.$store.dispatch('getFavorite')
    },
    addCartModal (item) {
      $('#ProductModal').modal('show')
      this.addCartTemplate = Object.assign({}, item)
      this.$set(this.addCartTemplate, 'qty', 1)
      this.$store.dispatch('updateModalDisplay', 'block')
    },
    addCart (obj) {
      this.$store.dispatch('addCart', obj)
      document.getElementById('addCartButton').disabled = true
      setTimeout(() => {
        this.addCartTemplate = {}
        document.getElementById('addCartButton').disabled = false
      }, 2000)
    },
    cleanTemplate () {
      this.addCartTemplate = {}
    },
    // 將參數值傳到資料上
    sortType (event) {
      let value = event.currentTarget.id
      this.$store.dispatch('sortType', value)
      this.getFilterProducts(this.recentCategory)
    },
    getSearchText (text) {
      this.$store.dispatch('getSearchText', text)
      this.getFilterProducts(this.recentCategory)
    },
    ...mapActions(['removeDesigner', 'removeSearchText', 'removeCategory', 'removeFilter', 'removeSort', 'showFavorite'])
  },
  // 監聽ModalDisplay關閉購買商品modal
  watch: {
    ModalDisplay () {
      if (this.ModalDisplay === 'none') {
        $('#ProductModal').modal('hide')
      }
    }
  },
  computed: {
    ...mapGetters(['isLoading', 'products', 'products', 'categoryList', 'designerlist', 'recentCategory',
      'recentDesigner', 'filterdata', 'pagination', 'favoProduct', 'isFavorite', 'sortValue', 'searchText', 'isFileLoading', 'ModalDisplay'])
  },
  created () {
    this.getProducts()
  }
}
</script>

<style lang="scss" scoped>
.card-img-top {
  border-radius: 0;
  max-height: 140px;
  object-fit: cover;
}
.card-img-top:hover {
  opacity: 0.5;
}
.product_card {
  border-top:0;
  border-left:0;
  box-shadow: 0px 0px 2px $shadow;
  border-radius: 0;
}
strong {
  font-size: 18px;
}
del {
  font-size: 14px;
}
.fa-cart-plus,
.fa-heart {
  transition: transform 0.1s ease-out;
  font-size: 26px;
  &:hover{
    transform: scale(0.9);
  }
  &:active {
    transform: scale(0.9);
  }
}
div,
a {
  font-family: inherit;
}
.cardshadow {
  border: none;
  box-shadow: 1px 1px 2px $shadow;
}
.heartSpan {
  height: 30px;
}
</style>

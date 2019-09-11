<template>
  <div>
    <Message></Message>
    <GoTop></GoTop>
    <div class="container p-0">
      <Navbar>
        <template v-slot:navlist>
          <!-- 主要navbar -->
          <div class="d-flex align-items-center p-2 px-md-4">
            <div class="d-flex mr-auto align-items-center">
              <!-- 回首頁 -->
              <router-link class="btn text-general mr-md-4 p-0" to="/home" style="min-width:80px;">
                <i class="fas fa-home fa-2x pt-1"></i>
                <small>HOME</small>
              </router-link>
              <!-- 登入紐 -->
              <button
                class="btn btn-general p-2 px-3 rounded-0 d-none d-md-block"
                data-toggle="modal"
                data-target="#signin"
                style="font-size:14px;"
              >登入 / 註冊</button>
            </div>

            <!-- 搜尋框 -->
            <div class="d-flex search-form px-2" @keyup.enter="goSearch(searchText)">
              <input
                class="form-control rounded-0 mr-sm-2"
                type="search"
                placeholder="找設計"
                aria-label="Search"
                v-model="searchText"
              />
              <button
                class="btn btn-general rounded-0"
                type="submit"
                @click.prevent="goSearch(searchText)"
              >
                <i class="fas fa-search"></i>
              </button>
            </div>

            <!-- 我的最愛 & 購物車 -->
            <div class="ml-auto d-flex">
              <a href="#" class="heart" data-toggle="modal" data-target=".favoriteModal">
                <div class="heartnum">{{heartNum}}</div>
                <i class="far fa-heart fa-2x text-general"></i>
              </a>
              <router-link class="text-general cart pl-2" to="/cart">
                <div class="cartnum">{{cartNum}}</div>
                <i class="fas fa-shopping-cart fa-2x"></i>
              </router-link>
            </div>
          </div>
          <!-- 選單 -->
          <div>
            <ul class="d-flex m-0 px-2 list-unstyled">
              <li>
                <router-link class="btn rounded-0 navlist" to="/products">找好設計</router-link>
              </li>
              <li>
                <router-link class="btn rounded-0 navlist" to="/magazine">設計誌</router-link>
              </li>
              <li>
                <router-link class="btn rounded-0 navlist" to="/imagewall">商品牆</router-link>
              </li>
            </ul>
          </div>
          <!-- modal -->

          <div
            class="modal fade favoriteModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-lg">
              <div class="modal-content p-2">
                <div class="border">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <div class="py-2 h4">我的最愛</div>
                  <div class="row no-gutters">
                    <div class="col-12 border-bottom" v-for="item in favoProduct" :key="item.id">
                      <div class="row no-gutters py-2">
                        <div class="col-6 col-md-4 col-lg-2 px-2">
                          <img
                            :src="item.imageUrl"
                            class="bg-cover"
                            alt
                            width="100%"
                            height="100%"
                            style="max-height:150px;"
                            srcset
                          />
                        </div>
                        <div class="col-6 col-md-8 col-lg-10">
                          <div class="row h-100 d-flex align-items-center">
                            <div class="col-md-3 text-left">
                              <a
                                href="#"
                                class="text-main"
                                @click.prevent="openProduct(item.id)"
                              >{{item.title}}</a>
                            </div>
                            <div class="col-md-3 text-left">{{item.description}}</div>
                            <div class="col-md-2 text-left">{{item.category}}</div>
                            <div class="col-md-1 text-left">/{{item.unit}}</div>
                            <div class="col-md-2 text-right">{{item.price|currency}}</div>
                            <div class="col-md-1">
                              <span class="text-right">
                                <!-- <i
                                  class="far fa-heart"
                                  v-if="item.isFavor != true"
                                  @click.prevent="addFavor(item)"
                                ></i>-->
                                <i
                                  class="fas fa-heart"
                                  v-if="item.isFavor === true"
                                  @click.prevent="addFavor(item)"
                                ></i>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a href="#" class="btn btn-general my-1" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">關閉</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </template>
      </Navbar>
      <router-view></router-view>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import GoTop from '../components/GoTop'
// import $on from 'jquery'
import Message from '../components/Message'

export default {
  name: 'customboard',
  data () {
    return {
      searchText: '',
      favoProduct: [],
      heartNum: '',
      cartNum: ''
    }
  },
  methods: {
    goSearch (text) {
      this.$router.push({
        path: '/products',
        query: {
          t: text
        }
      })
      this.$bus.$emit('getSearchText', text)
    },
    getCartNum () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      const vm = this
      vm.$http.get(api).then(response => {
        vm.cartNum = response.data.data.carts.length
      })
    },
    setFavorite () {
      let stringdata = JSON.stringify(this.favoProduct)
      localStorage.setItem('myFavorite', stringdata)
    },
    getFavorite () {
      this.favoProduct = JSON.parse(localStorage.getItem('myFavorite'))
      if (this.favoProduct === null) {
        this.heartNum = 0
      } else {
        this.heartNum = this.favoProduct.length
      }
    },
    addFavor (e) {
      const vm = this
      vm.favoProduct = vm.favoProduct || []
      e.isFavor = false
      vm.favoProduct.forEach(function (item, index, array) {
        if (item.title === e.title) {
          array.splice(index, 1)
        }
      })
      vm.setFavorite()
      vm.getFavorite()
    },
    openProduct (id) {
      let routerPush = this.$router.push({
        path: '/productpage',
        query: { id: id }
      })
      console.log(routerPush)
    }
  },
  components: {
    Navbar,
    Footer,
    GoTop,
    Message
  },
  created () {
    this.getCartNum()
    this.getFavorite()
    this.$bus.$on('addCart', this.getCartNum)
    this.$bus.$on('addHeart', this.getFavorite)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
td {
  text-align: left;
  // line-height: 100px;
}
.navlist {
  margin: 0px 5px;
  font-size: 15px;
  border-bottom-width: 3px;
  box-shadow: 0px 1px 0.5px $shadow;
}
.navlist:focus {
  border-bottom: 3px $first solid;
}
.cart {
  position: relative;
}
.cartnum {
  position: absolute;
  top: -5px;
  right: -5px;
  color: $white;
  background-color: $danger;
  border-radius: 50%;
  width: 20px;
  height: 20px;
}
.heart {
  position: relative;
}
.heartnum {
  position: absolute;
  top: -5px;
  right: -5px;
  color: $white;
  background-color: $danger;
  border-radius: 50%;
  width: 20px;
  height: 20px;
}
</style>

<template>
  <div>
    <!-- 至頂navbar -->
    <div class="topNavbar bg-primary p-2 ">
      <div class="d-flex align-items-center justify-content-sm-center justify-content-between">
        <i id="toggleicon" class="topicon navlist fas mx-2 fa-bars d-md-none" @click.prevent="togglelist"></i>
      <div class="mr-auto align-items-center d-none d-md-block">
        <ul class="d-flex m-0 list-unstyled">
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
      <router-link to="/home" class="">
        <h1 class="text-common h6 m-0 m-md-2 ">G o o d D e s i g n</h1>
      </router-link>
      <!-- 搜尋框 -->
      <div class="d-none d-sm-block mr-auto">
        <div class="d-flex px-2" @keyup.enter="goSearch(searchText)">
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
      </div>
      <!-- 我的最愛 & 購物車 -->
      <div class="d-flex">
        <a href="#" class="heart ml-2" data-toggle="modal" data-target=".favoriteModal">
          <div class="heartnum">{{favoNum}}</div>
          <i class="topicon far fa-heart text-common icon_heart"></i>
        </a>
        <router-link class="text-common cart mx-md-3 mx-2" to="/cart">
          <div class="cartnum">{{cartNum}}</div>
          <i class="topicon fas fa-shopping-cart icon_cart"></i>
        </router-link>
        <a class="" href="#" data-toggle="modal" data-target="#signin">
          <i class="topicon fas fa-user text-common"></i>
        </a>
        <router-link class="topicon fas fa-user-cog text-common mx-md-3 mx-2 d-none d-md-block" to="/dashboard"></router-link>
      </div>
      </div>
      <div class="d-flex search-form pt-2 mr-auto d-block d-sm-none" @keyup.enter="goSearch(searchText)">
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
    </div>
    <ul class="m-0 px-2 list-unstyled bg-primary " id="togglelist">
      <li>
        <router-link class="btn rounded-0 text-common navlist" to="/products">找好設計</router-link>
      </li>
      <li>
        <router-link class="btn rounded-0 text-common navlist" to="/magazine">設計誌</router-link>
      </li>
      <li>
        <router-link class="btn rounded-0 text-common navlist" to="/imagewall">商品牆</router-link>
      </li>
    </ul>
    <!-- 登入註冊Modal -->
    <div
      class="modal fade"
      id="signin"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      @keyup.enter="signin"
      >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-primary text-common">
            <h5 class="modal-title" id="exampleModalLabel">登入</h5>
            <button type="button" class="close text-secondary" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body p-5">
            <h2 class="">Good<img class="mb-2" src="../assets/logo.png" width="48" alt="" srcset="">esign</h2>
            <div class="my-4"></div>
            <form>
              <div class="form-group text-left">
                <label for="username"><span class="labelspan">帳號</span></label>
                <input
                  name="account"
                  type="email"
                  class="form-control"
                  id="username"
                  placeholder="請輸入email"
                  v-model="user.username"
                  v-validate="'required|email'"
                  :class="{'is-invalid':errors.has('account')}"
                />
                <small class="text-danger" v-if="errors.has('account')">{{errors.first('account')}}</small>
              </div>
              <div class="form-group text-left">
                <label for="password"><span class="labelspan">密碼</span></label>
                <input
                  name="password"
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="請輸入密碼"
                  v-validate="'required'"
                  v-model="user.password"
                />
                <small class="text-danger" v-if="errors.has('password')">欄位不得為空</small>
              </div>
            </form>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-general" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click.prevent="signin">確認送出</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 我的最愛modal -->
    <div
      class="modal fade favoriteModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
      >
      <div class="modal-dialog modal-lg">
        <div class="modal-content p-2">
          <div class="">
            <button type="button" class="close text-secondary p-1" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <div class="py-3 h4 bg-primary text-secondary">我的最愛</div>
            <div class="p-2">
              <div class="border-bottom" v-for="item in favoProduct" :key="item.id">
                <div class="row no-gutters py-2">
                  <div class="col-6 col-md-4 col-lg-2 px-2">
                    <img
                      :src="item.imageUrl"
                      class="bg-cover"
                      alt
                      width="100px"
                      height="100px"
                      srcset
                    />
                  </div>
                  <div class="col-6 col-md-8 col-lg-10">
                    <div class="row h-100 d-flex align-items-center">
                      <div class="col-md-3 text-left">
                        <a
                          href="#"
                          class="text-primary"
                          @click.prevent="openProduct(item.id)"
                        >{{item.title}}</a>
                      </div>
                      <div class="col-md-3 text-left">{{item.description}}</div>
                      <div class="col-md-2 text-left">{{item.category}}</div>
                      <div class="col-md-1 text-left">/{{item.unit}}</div>
                      <div class="col-md-2 text-right">{{item.price|currency}}</div>
                      <div class="col-md-1">
                        <span class="text-right">
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
            <a href="#" class="btn btn-general my-1" data-dismiss="modal" aria-label="Close" @click.prevent="refreshfavo">
              <span aria-hidden="true">關閉</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  data () {
    return {
      user: {
        username: '',
        password: '',
        heartNum: ''
      },
      searchText: ''
    }
  },
  methods: {
    togglelist () {
      $('#togglelist').slideToggle()
    },
    outsideclick () {
      $(window).click((e) => {
        let target = e.target.id
        if (target !== 'togglelist' && target !== 'toggleicon') {
          $('#togglelist').slideUp()
        }
      })
    },
    goSearch (text) {
      this.$router.push({
        path: '/products'
      })
      this.$store.dispatch('getSearchText', text)
      this.$store.dispatch('getFilterProducts', '')
    },
    signin () {
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`
      const vm = this
      vm.$validator.validate().then((valid) => {
        if (valid) {
          vm.$http.post(api, vm.user).then(response => {
            if (response.data.success) {
              $('#signin').modal('hide')
              this.$store.dispatch('updateMessage', { message: response.data.message, status: 'correct' })
            } else {
              this.$store.dispatch('updateMessage', { message: response.data.message, status: 'mistake' })
            }
          })
        } else {
          this.$store.dispatch('updateMessage', { message: '帳號或密碼不得為空', status: 'mistake' })
        }
      })
    },
    refreshfavo () {
      this.$store.dispatch('getFavorite')
    },
    setFavorite () {
      let stringdata = JSON.stringify(this.favoProduct)
      localStorage.setItem('myFavorite', stringdata)
    },
    getFavorite () {
      this.$store.dispatch('getFavorite')
    },
    addFavor (e) {
      this.$store.dispatch('addFavor', e)
      this.$store.dispatch('getFavorite')
    },
    openProduct (id) {
      this.$router.push({
        path: '/productpage',
        query: { id: id }
      })
    }
  },
  computed: {
    cartNum () {
      return this.$store.state.cartNum || 0
    },
    favoNum () {
      return this.$store.state.productModules.favoNum
    },
    favoProduct () {
      return this.$store.state.productModules.favoProduct
    }
  },
  watch: {
    cartNum () {
      $('.icon_cart').addClass('bounceIn')
      setTimeout(() => {
        $('.icon_cart').removeClass('bounceIn')
      }, 500)
    },
    favoNum () {
      $('.icon_heart').addClass('bounceIn')
      setTimeout(() => {
        $('.icon_heart').removeClass('bounceIn')
      }, 500)
    }
  },
  created () {
    this.outsideclick()
    this.$store.dispatch('getFavorite')
    this.$store.dispatch('getCart')
  }
}
</script>

<style scoped lang="scss">
.navbar-part {
  border: 2px $common solid;
}
.cart {
  position: relative;
}
.cartnum {
  position: absolute;
  top: -5px;
  right: -5px;
  color: $common;
  background-color: $mistake;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  z-index: 1100;
}
.heart {
  position: relative;
}
.heartnum {
  position: absolute;
  top: -5px;
  right: -5px;
  color: $common;
  background-color: $mistake;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  z-index: 1100;
}
.topicon {
  font-size:30px;
}
.topNavbar {
  width: 100%;
  position:fixed;
  z-index:10;
  opacity: 0.9;
}
.navlist {
  margin: 0px 5px;
  font-size: 15px;
  border-bottom-width: 3px;
  color:$common;
  &:hover{
    color:$secondary;
  }
  &:focus{
    color: $secondary;
    border-bottom: 3px $secondary solid;
  }
}
#togglelist{
  display: none;
  position: fixed;
  top:50px;
  left:0px;
  z-index: 10;
}
.labelspan{
  font-size: 18px;
  font-weight: 900;
}
</style>

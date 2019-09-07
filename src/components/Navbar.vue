<template>
  <div>
    <Alert></Alert>
    <!-- 至頂navbar -->
    <div class="navtop p-2 d-flex align-items-center">
      <router-link to="/home">
        <h1 class="text-white h6 m-0 m-md-2">G o o d D e s i g n</h1>
      </router-link>
      <h5 class="mr-auto text-light m-0"></h5>
      <a href="https://www.instagram.com/?hl=zh-tw" target="_blank" class="text-light mx-2">
        <i class="fab fa-instagram fa-x"></i>
      </a>
      <a href="https://www.facebook.com/" target="_blank" class="text-light mx-2">
        <i class="fab fa-facebook-square fa-x"></i>
      </a>
      <!-- 最上方後台紐 -->
      <router-link class="fas fa-user-cog fa-x text-light mx-3 d-none d-md-block" to="/dashboard"   ></router-link>
      <button
        class="btn btn-general p-2 d-block d-md-none"
        data-toggle="modal"
        data-target="#signin"
        style="font-size:14px;"
      >登入 / 註冊</button>
    </div>
    <!-- Navbar清單 -->
    <slot name="navlist"></slot>
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
          <div class="modal-header bg-first text-white">
            <h5 class="modal-title" id="exampleModalLabel">登入</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body p-5">
            <h2>Good Design</h2>
            <div class="border-bottom my-4"></div>
            <form>
              <div class="form-group text-left">
                <label for="username">帳號</label>
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
                <label for="password">密碼</label>
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
            <button type="button" class="btn btn-main" @click.prevent="signin">確認送出</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Alert from '../components/Alert'

export default {
  components: {
    Alert
  },
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    signin () {
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`
      const vm = this
      vm.$validator.validate().then((valid) => {
        if (valid) {
          vm.$http.post(api, vm.user).then(response => {
            if (response.data.success) {
              $('#signin').modal('hide')
              vm.$bus.$emit('message:push', response.data.message, 'main')
            } else {
              vm.$bus.$emit('message:push', response.data.message, 'danger')
            }
          })
        } else {
          vm.$bus.$emit('message:push', '帳號或密碼不得為空', 'danger')
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.navbar-part {
  border: 2px $white solid;
}
.navtop {
  // @include blue-gradual();
  background-color: $first;
}
</style>

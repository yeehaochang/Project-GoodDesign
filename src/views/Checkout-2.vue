<template>
  <div>
    <Alert></Alert>
    <loading :active.sync="isLoading"></loading>
    <Progress>
      <template v-slot:progress-2>
        <div class="progress-border">
          <div class="progress">
            <span>2</span>
          </div>
        </div>
        <div class="progress-title">訂單 & 付款</div>
        <div class="progress-line"></div>
      </template>
      <template v-slot:progress-3>
        <div class="progress-border">
          <div class="progress">
            <span>3</span>
          </div>
        </div>
        <div class="progress-title">結帳完成</div>
      </template>
    </Progress>

    <div class="container">
      <form>
        <!-- 商品資訊 -->

        <div class="form-row">
          <div class="form-group col-md-6">
            <div class="col-12 p-2 bg-second text-main">
              <strong>商品資訊</strong>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6 text-left">
                <label for="orderid">訂單編號</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="recentOrder.id"
                  id="inputEmail4"
                  placeholder
                  disabled
                />
              </div>
              <div class="form-group col-md-6 text-left">
                <label for="total">訂單總金額</label>
                <!-- <input
                  type="number"
                  class="form-control"
                  id="total"
                  placeholder
                  v-model="recentOrder.total"
                  disabled
                />-->
                <div class="form-control text-right disabled">{{recentOrder.total|currency}}</div>
              </div>
              <div class="form-group col-12 text-left">
                <label for="message">訂單備註</label>
                <input
                  type="text"
                  class="form-control"
                  id="message"
                  v-model="recentOrder.message"
                  placeholder
                  disabled
                />
              </div>
              <div class="form-group col-12 text-left">
                <label for="total">商品預覽：</label>
                <div class="row no-gutters">
                  <div
                    class="col-4 col-md-6 col-lg-3"
                    v-for="item in recentOrder.products"
                    :key="item.id"
                  >
                    <img
                      :src="item.product.imageUrl"
                      class="p-1"
                      width="120"
                      height="100"
                      alt
                      srcset
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 買家資訊 -->

          <div class="form-group col-md-6">
            <div class="p-2 bg-second text-main">
              <strong>訂購人資料</strong>
            </div>
            <div class="form-row p-3">
              <div class="form-group col-md-6 text-left">
                <label for="name">姓名</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="recentOrder.user.name"
                  placeholder
                  disabled
                />
              </div>
              <div class="form-group col-12 col-md-6 text-left">
                <label for="tel">連絡電話</label>
                <input
                  type="tel"
                  class="form-control"
                  id="tel"
                  v-model="recentOrder.user.tel"
                  placeholder
                  disabled
                />
              </div>
              <div class="form-group col-12 text-left">
                <label for="email">email</label>
                <input
                  type="email"
                  class="form-control"
                  v-model="recentOrder.user.email"
                  id="email"
                  placeholder
                  disabled
                />
              </div>
              <div class="form-group col-12 text-left">
                <label for="address">地址</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="recentOrder.user.address"
                  id="address"
                  placeholder
                  disabled
                />
              </div>
              <div class="form-group col-12">
                <div>
                  付款狀態：
                  <span class="text-danger" v-if="!recentOrder.is_paid">尚未付款</span>
                  <span class="text-success" v-if="recentOrder.is_paid">完成付款</span>
                </div>
              </div>
              <div class="col-12">
                <a href="#" class="btn btn-general" @click.prevent="payment">點擊付款</a>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Progress from '../components/Progress'
import Alert from '../components/Alert'

export default {
  components: {
    Progress,
    Alert
  },
  data () {
    return {
      isLoading: false,
      orderId: '',
      recentOrder: {}
    }
  },
  methods: {
    getOrders () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${this.$route.params.orderId}`
      const vm = this
      vm.isLoading = true
      this.$http.get(api).then(response => {
        console.log('這是該筆訂單', response)
        vm.recentOrder = response.data.order
        vm.isLoading = false
      })
    },
    payment () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${this.recentOrder.id}`
      const vm = this
      vm.isLoading = true
      vm.$http.post(api, vm.recentOrder.id).then(response => {
        this.$bus.$emit('message:push', response.data.message, 'main')
        console.log('結帳付款', response)
        vm.isLoading = false
      })
      vm.getOrders()
    }
  },
  created () {
    this.getOrders()
  }
}
</script>

<style lang='scss' scoped>
.back {
  font-size: 16px;
  font-weight: bold;
  top: 20px;
  left: 10px;
}
.progress-border {
  margin-left: 10px;
  min-width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: $first;
  .progress {
    position: relative;
    top: 5px;
    left: 5px;
    // border: white 2px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: $white;
    span {
      color: $first;
      font-weight: bold;
      font-size: 20px;
      position: absolute;
      top: 4%;
      left: 30%;
    }
  }
}
.progress-line {
  width: 5%;
  height: 4px;
  background-color: $general;
}
.progress-title {
  font-weight: bold;
  padding: 8px;
}
.unprogress-border {
  margin-left: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: $shadow;
  .progress {
    position: relative;
    top: 5px;
    left: 5px;
    // border: white 2px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: $white;
    span {
      color: $shadow;
      font-weight: bold;
      font-size: 20px;
      position: absolute;
      top: 4%;
      left: 30%;
    }
  }
}
.unprogress-line {
  width: 75px;
  height: 4px;
  margin-top: 17.5px;
  background-color: $shadow;
}
.disabled {
  background-color: $gray-200;
}
</style>

<template>
  <div>
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
    </Progress>
    <!-- 建立訂單 -->
    <div class="row no-gutters mb-4">
      <div class="col-md-7">
        <div class="text-left bg-secondary text-primary p-2 pl-2 tag_name">訂單商品列表：</div>
        <table class="table">
          <tbody>
            <tr class="p-2 border-bottom" v-for="item in cart" :key="item.id">
              <td>
                <img :src="item.product.imageUrl" alt width="120px" height="80" srcset />
              </td>
              <td>
                <a
                  href
                  class="text-primary"
                  @click.prevent="openProduct(item.product.id)"
                >{{item.product.title}}</a>
              </td>
              <td>{{item.qty}}{{item.product.unit}}</td>
              <td class="text-right">{{item.total|currency}}</td>
            </tr>
          </tbody>
        </table>

        <div class="text-right p-2">商品小計：{{getTotal|currency}}</div>
        <div class="text-right p-2" v-if="final_price !== ''">折扣後小計：{{final_price|currency}}</div>
      </div>

      <!-- 右側表單 -->
      <div class="col-md-5">
        <form class="ml-md-2">
          <div class="row bg-secondary m-0 p-4">
            <div class="form-group col-md-6 mb-2">
              <label class="tag_name" for="name">收件人姓名</label>
              <input
                name="name"
                type="text"
                class="form-control"
                id="name"
                v-model="checkInfor.name"
                placeholder="請輸入姓名"
                v-validate="'required'"
                :class="{'is-invalid':errors.has('name')}"
              />
              <small class="text-danger" v-if="errors.has('name')">欄位不得為空</small>
            </div>
            <div class="form-group col-md-6 mb-2">
              <label class="tag_name" for="email">Email</label>
              <input
                id="email"
                type="email"
                class="form-control"
                name="email"
                v-model="checkInfor.email"
                placeholder="請輸入email"
                v-validate="'required|email'"
                :class="{'is-invalid':errors.has('email')}"
              />
              <small class="text-danger" v-if="errors.has('email')">{{errors.first('email')}}</small>
            </div>
            <div class="form-group col-12 mb-2">
              <label class="tag_name" for="tel">聯絡電話</label>
              <input
                id="tel"
                type="tel"
                class="form-control"
                name="tel"
                v-model="checkInfor.tel"
                placeholder="請輸入連絡電話"
                v-validate="'required'"
                :class="{'is-invalid':errors.has('tel')}"
              />
              <small class="text-danger" v-if="errors.has('tel')">欄位不得為空</small>
            </div>
            <div class="form-group col-12 mb-2">
              <label class="tag_name" for="address">收件人地址</label>
              <input
                id="address"
                type="text"
                class="form-control"
                name="address"
                v-model="checkInfor.address"
                placeholder="請輸入地址"
                v-validate="'required'"
                :class="{'is-invalid':errors.has('address')}"
              />
              <small class="text-danger" v-if="errors.has('address')">欄位不得為空</small>
            </div>
            <div class="form-group col-12 mb-2">
              <label class="tag_name" for="textarea">留言備註</label>
              <input
                id="textarea"
                type="text"
                class="form-control"
                name="textarea"
                v-model="checkMessage"
                placeholder
                v-validate="'required'"
                :class="{'is-invalid':errors.has('textarea')}"
              />
              <small class="text-danger" v-if="errors.has('textarea')">欄位不得為空</small>
            </div>
            <div class="form-group col-12 mb-2">
              <label class="tag_name" for="coupon">套用優惠券</label>
              <div class="input-group mb-3">
                <input
                  id="coupon"
                  name="coupon"
                  type="text"
                  class="form-control"
                  placeholder
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                  v-model="recentCoupon"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-outline-general"
                    type="button"
                    id="button-addon2"
                    @click.prevent="checkCounpon"
                  >確認</button>
                </div>
              </div>
            </div>
            <span class="text-danger">
              注意：訂單點選確認送出後
              <br />將直接建立完成
            </span>
            <button type="button" class="btn btn-general ml-auto" @click.prevent="checkOrder">確認送出</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery'
import Progress from '../components/Progress'

export default {
  data () {
    return {
      checkInfor: {
        name: '',
        email: '',
        tel: '',
        address: ''
      },
      recentCoupon: '',
      checkMessage: '',
      finalpay: ''
    }
  },
  components: {
    Progress
  },
  methods: {
    getCart () {
      this.$store.dispatch('getCart')
    },
    checkOrder () {
      // 表單驗證及送出
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
      const vm = this
      const postInfor = {
        user: vm.checkInfor,
        message: vm.checkMessage
      }
      this.$validator.validate().then(valid => {
        if (valid) {
          // do stuff if not valid.
          this.$http.post(api, { data: postInfor }).then(response => {
            console.log('建立訂單', response)
            this.$store.dispatch('getCart')
            if (response.data.success) {
              this.$store.dispatch('updateMessage', { message: response.data.message, status: 'correct' })
              this.$router.push({
                path: `/checkout-2/${response.data.orderId}`
              })
            } else {
              this.$store.dispatch('updateMessage', { message: response.data.message, status: 'mistake' })
            }
          })
        } else {
          this.$store.dispatch('updateMessage', { message: '欄位不完整', status: 'mistake' })
        }
      })
    },
    openProduct (id) {
      let routerPush = this.$router.resolve({
        path: '/productpage',
        query: { id: id }
      })
      window.open(routerPush.href, '_blank')
    },
    checkCounpon () {
      this.$store.dispatch('useCounpon', { data: { code: this.recentCoupon } })
    }
  },
  computed: {
    cart () {
      return this.$store.state.cart
    },
    isLoading () {
      return this.$store.state.isLoading
    },
    final_price () {
      return this.$store.state.final_price
    },
    getTotal () {
      return this.$store.state.getTotal
    }
  },
  created () {
    this.getCart()
  }
}
</script>

<style lang="scss" scoped>
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
  background-color: $primary;
  .progress {
    position: relative;
    top: 5px;
    left: 5px;
    // border: common 2px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: $common;
    span {
      color: $primary;
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
    // border: common 2px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: $common;
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
td {
  border: none;
  text-align: left;
}
label {
  display: block;
  text-align: left;
  font-size: 14px;
}
</style>

<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <Progress>
      <template v-slot:back>
        <router-link class="back text-general" to="/products">
          <i class="fas fa-arrow-left"></i>
          繼續購物
        </router-link>
      </template>
    </Progress>
    <div class="pb-2">
      <div class="row no-gutters">
        <div class="col-md-8">
          <div class="text-left bg-secondary text-primary border-secondary p-2 pl-2">訂單商品列表：</div>
          <span v-if="cart.length === 0">目前尚無任何商品</span>
          <table class="table">
            <tbody>
              <tr
                class="p-2 border-bottom"
                v-for="item in cart"
                :key="item.id"
              >
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
                <td>
                  {{item.qty}}{{item.product.unit}}
                </td>
                <td class="text-right px-0">{{item.total|currency}}</td>
                <td>
                  <button type="button" class="close" @click.prevent="removeCartProduct(item)">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="col-md-4">
          <div class="card rounded-0 ml-md-2">
            <h5 class="card-header bg-secondary text-primary">訂單摘要</h5>
            <div class="card-body">
              <table class="w-100">
                <tbody>
                  <tr>
                    <td width="" class="text-left">商品總計</td>
                    <td width class="text-right">{{getTotal|currency}}</td>
                  </tr>
                  <tr>
                    <td width class="text-left">商品數量</td>
                    <td width class="text-right">{{getProductLength}}</td>
                  </tr>
                </tbody>
              </table>
              <div class="text-right">
                <a href="#" class="btn btn-general" @click.prevent="gocheckout">結帳去</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Progress from '../components/Progress'

export default {
  data () {
    return {
    }
  },
  components: {
    Progress
  },
  methods: {
    getCart () {
      this.$store.dispatch('getCart')
    },
    removeCartProduct (item) {
      this.$store.dispatch('removeCartProduct', item)
    },
    openProduct (id) {
      let routerPush = this.$router.resolve({
        path: '/productpage',
        query: { id: id }
      })
      window.open(routerPush.href, '_blank')
    },
    changeqty (item, qty) {
      item.qty = parseInt(qty)
      item.final_total = parseInt(item.product.price) * parseInt(item.qty)
      item.total = parseInt(item.product.price) * parseInt(item.qty)
    },
    gocheckout () {
      if (this.cart.length !== 0) {
        this.$router.push({
          path: '/checkout-1'
        })
      } else {
        this.$store.dispatch('updateMessage', { message: '購物車尚無商品，無法進行結帳', status: 'mistake' })
      }
    }
  },
  computed: {
    getProductLength () {
      return this.cart.length
    },
    getTotal () {
      return this.$store.state.getTotal || ''
    },
    cart () {
      return this.$store.state.cart || []
    },
    isLoading () {
      return this.$store.state.isLoading
    }
  },
  created () {
    this.getCart()
  }
}
</script>

<style lang="scss" scoped>
.cartCard {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
td {
  border:none;
  text-align: left;
}
</style>

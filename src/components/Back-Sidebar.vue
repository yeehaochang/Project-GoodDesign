<template>
  <div>
    <div class="list-group mt-2 tag_board">
      <router-link class="list-group-item card_3d" to="/backproducts">編輯商品</router-link>
      <router-link class="list-group-item card_3d" to="/backcoupons">優惠券</router-link>
      <router-link class="list-group-item card_3d" to="/backorders">訂單列表</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
a {
  color: $general;
}
a:focus {
  background-color: $primary;
  color: $common;
}
</style>

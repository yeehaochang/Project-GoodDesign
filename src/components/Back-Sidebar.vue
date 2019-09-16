<template>
  <div>
    <div class="list-group mt-2">
      <router-link class="list-group-item" to="/backproducts">編輯商品</router-link>
      <router-link class="list-group-item" to="/backcoupons">優惠券</router-link>
      <router-link class="list-group-item" to="/backorders">訂單列表</router-link>
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
  background-color: $first;
  color: $common;
}
</style>

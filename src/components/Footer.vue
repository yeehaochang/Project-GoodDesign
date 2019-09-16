<template>
  <div>
    <!-- 第一層footer -->
    <footer class="bg-second pt-4 px-4">
      <!-- 第二層footer -->
      <div class="row no-gutters">
        <div class="col-2 col-md-4"></div>

        <div class="col-5 col-md-3">
          <div class="h6 text-left mb-4">購物 / 販售</div>
          <div class="d-flex flex-column-reverse align-items-start">
            <router-link class="text-first" to="/products">所有商品</router-link>
            <router-link class="text-first" to="/imagewall">商品牆</router-link>
            <router-link class="text-first" to="/magazine">設計誌</router-link>
          </div>
        </div>

        <div class="col-5 col-md-3">
          <div class="h6 text-left mb-4">追蹤我們</div>
          <div class="d-flex flex-column-reverse align-items-start">
            <a class="text-general" href="mailto:s2995510@gmail.com">
              <i class="fas fa-envelope fa-2x"></i>
            </a>
            <a href="https://www.instagram.com/?hl=zh-tw" class="text-general">
              <i class="fab fa-instagram fa-2x"></i>
            </a>
            <a href="https://www.facebook.com/" class="text-general">
              <i class="fab fa-facebook-square fa-2x"></i>
            </a>
          </div>
        </div>

        <div class="d-none d-md-block col-md-2"></div>

      </div>
      <div class="border-top mt-2 p-1">
        <small class="py-1">copyright © 2019 GoodDesign</small>
      </div>
    </footer>
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
  font-size: 14px;
}
</style>

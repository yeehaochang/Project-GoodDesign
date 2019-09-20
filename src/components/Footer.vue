<template>
  <div>
    <!-- 第一層footer -->
    <footer class="bg-secondary pt-4 px-4">
      <!-- 第二層footer -->
      <div class="d-flex justify-content-center">
        <!-- <div class="col-2 col-md-5"></div> -->

        <div class="mx-auto">
          <div class="text-left mb-3"><strong>購物 / 販售</strong></div>
          <div class="d-flex flex-column-reverse align-items-start">
            <router-link class="text-primary pb-2" to="/products">所有商品</router-link>
            <router-link class="text-primary pb-2" to="/imagewall">商品牆</router-link>
            <router-link class="text-primary pb-2" to="/magazine">設計誌</router-link>
          </div>
        </div>
        <div class="mx-auto">
          <div class="text-left mb-3"><strong>追蹤我們</strong></div>
          <div class="d-flex flex-column-reverse align-items-start">
            <a href="https://www.instagram.com/?hl=zh-tw" class="text-primary p-1">
              <i class="fab fa-instagram fa-2x"></i>
            </a>
            <a href="https://www.facebook.com/" class="text-primary p-1">
              <i class="fab fa-facebook-square fa-2x"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="border-top mt-2 p-1">
        <strong class="text-primary">copyright © 2019 GoodDesign </strong><img class="mb-1" src="../assets/logo.png" width="24" alt="" srcset="">
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
  font-weight: 700;
}
.fab {
  display: inline-block;
  height: 10px;
  width: 10px;
}
</style>

<template>
  <div>
    <div class="mb-2 p-2 bg_wall">
      <div class="py-2">
        <a href="#" class="btn btn-second text-general" @click.prevent="showMultiple"><strong>點我依序觀看</strong></a>
      </div>

      <span v-for="item in imgArray" :key="item">
        <a href="#" @click.prevent="showSingle(item)">
          <img :src="item" alt class="img-fluid border border-second m-1" width="30%" />
        </a>
      </span>
    </div>
    <VueEasyLightbox :visible="visible" :imgs="imgs" :index="index" @hide="handleHide"></VueEasyLightbox>
  </div>
</template>

<script>
import VueEasyLightbox from 'vue-easy-lightbox'

export default {
  components: {
    VueEasyLightbox
  },
  data () {
    return {
      imgs: '', // Img Url , string or Array
      visible: false,
      index: 0, // default
      imgArray: []
    }
  },
  methods: {
    showSingle (url) {
      this.imgs = url
      this.show()
    },
    showMultiple () {
      this.imgs = this.imgArray
      this.index = 1 // index of imgList
      this.show()
    },
    show () {
      this.visible = true
    },
    handleHide () {
      this.visible = false
    },
    getAllProducts () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      const vm = this
      vm.isLoading = true
      this.$http.get(api).then(response => {
        let newProd = response.data.products
        vm.imgArray = newProd.map(function (item) {
          return item.imageUrl
        })
      })
    }
  },
  created () {
    this.getAllProducts()
    this.imgs = ''
  }
}
</script>

<style lang="scss" scoped>
    img:hover{
        opacity: 0.8;
    }
    .bg_wall{
        background-image: url(../assets/wall.jpg);
        // background-attachment: fixed;
        background-position: center center;
        background-size: cover;
    }

</style>

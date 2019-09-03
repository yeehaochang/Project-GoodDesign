<template>
  <div>
    <div class="my-2 p-2 bg_wall">
      <div class="py-2">
        <!-- <span class="text-second">#點選觀看圖片細節</span> -->
        <a href="#" class="btn btn-second text-general" @click.prevent="showMultiple"><strong>依序瀏覽模式</strong></a>
      </div>

      <span v-for="item in imgArray" :key="item">
        <a href="#" @click.prevent="showSingle(item)">
          <img :src="item" alt class="img-fluid border border-second m-1" width="30%" />
        </a>
      </span>
    </div>
    <VueEasyLightbox :visible="visible" :imgs="imgs" :index="index" @hide="handleHide"></VueEasyLightbox>
    <!-- <button @click="showSingle">Show single picture.</button>
    <button @click="showMultiple">Show a group of pictures.</button>-->
    <!-- <VueEasyLightbox :visible="visible" :imgs="item" :index="index" @hide="handleHide"></VueEasyLightbox> -->

    <!-- Component name: 'vue-easy-lightbox' -->

    <!-- <vue-easy-lightbox
        :visible="visible"
        :imgs="imgs"
        :index="index"
        @hide="handleHide"
    ></vue-easy-lightbox>-->
  </div>
</template>

<script>
import VueEasyLightbox from "vue-easy-lightbox";

export default {
  components: {
    VueEasyLightbox
  },
  data() {
    return {
      imgs: "", // Img Url , string or Array
      visible: false,
      index: 0, // default
      imgArray: []
    };
  },
  methods: {
    showSingle(url) {
      this.imgs = url;
      this.show();
    },
    showMultiple() {
      this.imgs = this.imgArray;
      this.index = 1; // index of imgList
      this.show();
    },
    show() {
      this.visible = true;
    },
    handleHide() {
      this.visible = false;
    },
    getAllProducts() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        let newProd = response.data.products;
        vm.imgArray = newProd.map(function(item) {
          return item.imageUrl;
        });
      });
    }
  },
  created() {
    this.getAllProducts();
    this.imgs = "";
  }
};
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
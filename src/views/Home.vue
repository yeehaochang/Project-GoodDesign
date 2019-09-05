<template>
  <div>
    <Alert></Alert>
    <loading :active.sync="isLoading"></loading>
    <!-- swiper圖片區塊 -->
    <swiper :options="swiperMain">
      <swiper-slide v-for="item in SwiperImgs" :key="item.key" >
        <img :src="item.imgurl" class="img-fluid"/>
      </swiper-slide>
      <!-- <div class="swiper-scrollbar"></div> -->
      <div class="swiper-button-next" slot="button-prev"></div>
      <div class="swiper-button-prev" slot="button-next"></div>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <!-- youtube -->
    <div id="videoboard">
      <div id="video" class="video bg-second py-4 my-2 rounded d-none d-md-block">
        <button type="button" class="close text-main" @click.prevent="closetv">
          <span aria-hidden="true" class="pr-2">&times;</span>
        </button>
        <youtube :video-id="videoId" ref="youtube" @playing="playing"></youtube>
      </div>
    </div>

    <div class="onsale-Products">
      <!-- swiper更多優惠區塊 -->
      <span class="home-pop">更多優惠</span>
      <swiper :options="swiperProducts" class="swiper-container-2">
        <swiper-slide class v-for="item in onsale" :key="item.id">
          <a href="#" @click.prevent="openProduct(item.id)">
            <img :src="item.imageUrl" alt class="card-img-top img-fluid" style="min-height:150px;" />
          </a>
          <div class="title">{{item.title}}</div>
          <div class="text-left d-none d-md-block">{{item.description}}</div>
          <div class="text-right">
            <i
              class="far fa-heart mr-1"
              v-if="item.isFavor != true"
              @click.prevent="addFavor(item)"
            ></i>
            <i
              class="fas fa-heart mr-1"
              v-if="item.isFavor === true"
              @click.prevent="addFavor(item)"
            ></i>
          </div>
          <div class="row text-left no-gutters">
            <div
              class="col-12 col-md-6 col-lg-4"
              v-if="item.price == item.origin_price"
            >{{item.origin_price|currency}}</div>
            <del
              class="col-12 col-md-6 col-lg-4"
              v-if="item.price !== item.origin_price"
            >{{item.origin_price|currency}}</del>
            <strong
              class="col-12 col-md-6 col-lg-4"
              v-if="item.price !== item.origin_price"
            >{{item.price|currency}}</strong>
            <a
              href="#"
              class="text-main text-right col-12 col-lg-4 pr-1"
              @click.prevent="addCart(item.id)"
            >
              <i class="fas fa-cart-plus"></i>
            </a>
          </div>
        </swiper-slide>

        <!-- <div class="swiper-pagination sw-2" slot="pagination"></div> -->
        <div class="swiper-button-next" slot="button-prev"></div>
        <div class="swiper-button-prev" slot="button-next">
          <!-- <i class="fas fa-hand-point-right fa-2x box-center"></i> -->
        </div>
      </swiper>
    </div>
    <!-- 特色介紹區塊 -->
    <div class="row no-gutters aboutus">
      <!-- <div class="col-12"><span class="text-first">品牌理念</span></div> -->
      <div class="col-12 col-md-4 p-2" v-for="item in aboutUsImg" :key="item.key">
        <img :src="item.url" width="150" alt />
        <div class="title">{{item.title}}</div>
        <div class="content">{{item.content}}</div>
      </div>
    </div>
    <div class="border-bottom"></div>
  </div>
</template>





<script>
import $ from "jquery";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import Alert from "../components/Alert";

export default {
  data() {
    return {
      fullWidth:'',
      favoProduct: [],
      videoId: "34qHK_fUgUs",
      // swiper資料，一個大坑
      swiperMain: {
        autoplay: {
          disableOnInteraction: false, //用户操作后是否禁止自动循环
          delay: 4000 //自动循环时间
        }, //可选选项，自动滑动
        speed: 3000, //切换速度，即slider自动滑动开始到结束的时间（单位ms）
        loop: true, //循环切换
        grabCursor: false, //设置为true时，鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状
        // setWrapperSize: true, //Swiper使用flexbox布局(display: flex)，开启这个设定会在Wrapper上添加等于slides相加的宽或高，在对flexbox布局的支持不是很好的浏览器中可能需要用到。
        autoHeight: true, //自动高度。设置为true时，wrapper和container会随着当前slide的高度而发生变化。
        scrollbar: ".swiper-scrollbar", //显示滚动条
        mousewheelControl: true, //设置为true时，能使用鼠标滚轮控制slide滑动
        observeParents: false, //当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper

        pagination: {
          el: ".swiper-pagination",
          // type : 'progressbar', //分页器形状
          clickable: true //点击分页器的指示点分页器会控制Swiper切换
        },
        navigation: {
          // nextEl,prevEl為navigation方法
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      aboutUsImg: [
        //建議將絕對路徑修正成正確路徑，你原本的路徑還需要往更上一層，require 前面不用使用 ` 且 () 內多一個單引號，key 的值最開頭不可有 0 ，
        {
          url: require("../assets/img-1.png"),
          title: "集結世界各地好設計",
          content:
            "Gathering good designers everywhere in the world,includes so many kinds of art and handmade culture.",
          key: 1
        },
        {
          url: require("../assets/img-2.png"),
          title: "富含創意的高品質設計",
          content:
            "After our team review and choice , we do our best to give what you guys deserve the good design.",
          key: 2
        },
        {
          url: require("../assets/img-3.png"),
          title: "設計師與顧客的保障",
          content:
            "Be a good bridge between designer and customers,good buy for good life.",
          key: 3
        }
      ],
      SwiperImgs: [
        {
          imgurl:
            require('../assets/banner-1.jpg'),
          key: 1
        },
        {
          imgurl:
            require('../assets/banner-2.jpg'),
            key:2
        },
        {
          imgurl:
            require('../assets/banner-3.jpg'),
          key: 3
        }
      ],
      swiperProducts: {
        slidesPerView: 4,
        spaceBetween: 20,
        slidesPerGroup: 4,
        autoHeight: true,
        height: 250,
        // loop: true,
        // speed: 2000,
        loopFillGroupWithBlank: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      onsale: [],
      isLoading:false,
    };
  },
  components: {
     Alert,
    swiper,
    swiperSlide
  },
  methods: {
    playVideo() {
      this.player.playVideo();
    },
    playing() {
      console.log("o/ we are watching!!!");
    },
    getProducts(page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      const vm = this;
      this.$http.get(api).then(response => {
        let newProd = response.data.products;
        vm.onsale = newProd.filter(function(item) {
          return item.origin_price !== item.price;
        });
        vm.putFavorite(vm.onsale);
      });
    },
    openProduct(id) {
      let params = { title: "test" };
      let routerPush = this.$router.push({
        path: "/productpage",
        query: { id: id }
      });
      console.log(routerPush);
    },
    addCart(id) {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const pushProduct = {
        product_id: id,
        qty: "1"
      };
      this.$http.post(api, { data: pushProduct }).then(response => {
        this.$bus.$emit("addCart");
        this.$bus.$emit("message:push", response.data.message, "main");
        vm.isLoading = false;
        console.log("新增至購物車", response);
      });
    },
    setFavorite() {
      let stringdata = JSON.stringify(this.favoProduct);
      localStorage.setItem("myFavorite", stringdata);
    },
    getFavorite() {
      this.favoProduct = JSON.parse(localStorage.getItem("myFavorite"));
      console.log("我的最愛", JSON.parse(localStorage.getItem("myFavorite")));
    },
    putFavorite(productdata) {
      const vm = this;
      vm.favoProduct = vm.favoProduct || [];
      let titledata = vm.favoProduct.map(function(item) {
        return item.title;
      });
      productdata.forEach(function(item, index, array) {
        if (titledata.includes(item.title)) {
          vm.$set(item, "isFavor", true);
        }
      });
    },
    addFavor(e) {
      const vm = this;
      vm.favoProduct = vm.favoProduct || [];
      if (e.isFavor) {
        e.isFavor = false;
        vm.favoProduct.forEach(function(item, index, array) {
          if (item.title === e.title) {
            array.splice(index, 1);
          }
        });
        vm.setFavorite();
      } else {
        vm.$set(e, "isFavor", true);
        vm.favoProduct.push(e);
        vm.setFavorite();
      }
      vm.$bus.$emit("addHeart");
      vm.getFavorite();
    },
    closetv() {
      $("#videoboard").addClass("d-none");
    }
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    },
  },
  created() {
    this.getFavorite();
    this.getProducts();
  },
};
</script>




<style lang="scss" scoped>
del,strong {
  font-size: 20px;
}
.fa-cart-plus,
.fa-heart {
  font-size: 26px;
}
.aboutus {
  img {
    width: 120px;
    margin: 40px 0px;
  }
  .title {
    font-weight: 900;
    font-size: 18px;
  }
  .content {
    padding: 15px 50px;
    font-size:18px;
    font-family: sans-serif;
    overflow: hidden;
    text-align: left;
  }
  li {
    font-size: 16px;
  }
}

// swiper樣式

%swiper-next {
  right: 5px;
  background-color: rgba(255, 255, 255, 0.8);
  width: 37px;
  height: 54px;
  box-shadow: 1px 1px 1px $third;
  background-image: url("../assets/chevron-right-solid.svg");
}

.swiper-container {
  width: 100%;
  height: 400px;
  @media (max-width: 992px) {
    height: 300px;
  }
  @media (max-width: 768px) {
    height: 200px;
  }
  @media (max-width: 576px) {
    height: 120px;
  }
  // margin: 20px auto;
}
.swiper-container-2 {
  padding-top: 50px;
  height: 0px;
  min-height: 400px;
}
.swiper-container img {
  background-position: center center;
}
.swiper-button-next {
  @extend %swiper-next;
}
.swiper-button-prev {
  left: 5px;
  background-color: rgba(255, 255, 255, 0.8);
  // border-radius: 10px;
  width: 37px;
  height: 54px;
  box-shadow: 1px 1px 1px $third;
  background-image: url("../assets/chevron-left-solid.svg");
}
.swiper-slide {
  justify-content: center;
}

// card

.card-img-top {
  max-height: 130px;
  object-fit: cover;
}
.card-img-top:hover {
  opacity: 0.5;
}

.onsale-Products {
  position: relative;
  .home-pop {
    border: 1.5px $first solid;
    padding: 6px;
    position: absolute;
    z-index: 10;
    top: 5px;
    left: 0px;
  }
  .title {
    min-height: 50px;
    line-height: 50px;
    @media (max-width: 568px) {
      line-height: 25px;
    }
  }
}
</style>
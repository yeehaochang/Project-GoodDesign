<template>
  <div>
    <div class="home_banner text-center d-flex">
      <strong class="banner_log my-auto mx-auto animated-top">Get design what you deserve.<br>帶走屬於你的好設計</strong>
    </div>
    <loading :active.sync="isLoading"></loading>
    <!-- swiper 主要產品區塊 -->
    <div class="container newArrival">
      <div class="text-center p-3">
        <span class="px-3 py-2 text-first bg-second rounded">New Arrival</span>
      </div>
      <swiper :options="swiperAllProducts" class="swiper-container-2">
        <swiper-slide v-for="item in origin_products" :key="item.id">
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
            <strong
              class=" col-md-6"
              v-if="item.price == item.origin_price"
            >{{item.origin_price|currency}}</strong>
            <a
              href="#"
              class="text-general text-right  col-md-6 pr-1"
              @click.prevent="addCart(item.id)"
            >
              <i class="fas fa-cart-plus"></i>
            </a>
          </div>
        </swiper-slide>
        <!-- <div class="swiper-pagination" slot="pagination"></div> -->
        <!-- <div class="swiper-button-next" slot="button-prev"></div>
        <div class="swiper-button-prev" slot="button-next"></div> -->
    </swiper>
    </div>
    <!-- swiper banner圖片區塊 -->
    <swiper :options="swiperBanner" class="container p-0">
      <swiper-slide v-for="item in SwiperImgs" :key="item.key" >
        <img :src="item.imgurl" class="img-fluid"/>
      </swiper-slide>
      <div class="swiper-button-next" slot="button-prev"></div>
      <div class="swiper-button-prev" slot="button-next"></div>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <!--  -->
    <!-- swiper更多優惠區塊 -->
    <div class="onsale container">
      <div class="text-center p-3">
        <span class="px-3 py-2 text-first bg-second rounded">On Sale</span>
      </div>
      <swiper :options="swiperOnSale" class="swiper-container-2">
        <swiper-slide v-for="item in onsale" :key="item.id">
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
              class=" col-md-6 col-lg-4"
              v-if="item.price == item.origin_price"
            >{{item.origin_price|currency}}</div>
            <del
              class=" col-md-6 col-lg-4"
              v-if="item.price !== item.origin_price"
            >{{item.origin_price|currency}}</del>
            <strong
              class=" col-md-6 col-lg-4"
              v-if="item.price !== item.origin_price"
            >{{item.price|currency}}</strong>
            <a
              href="#"
              class="text-general text-right  col-lg-4 pr-1"
              @click.prevent="addCart(item.id)"
            >
              <i class="fas fa-cart-plus"></i>
            </a>
          </div>
        </swiper-slide>
        <div class="swiper-button-next" slot="button-prev"></div>
        <div class="swiper-button-prev" slot="button-next"></div>
      </swiper>
    </div>
    <!-- 提領優惠 -->
    <div class="bg-second py-4 px-2 rounded">
        <strong class="text-general coupon_pop_1">What !! </strong>
        <strong class="text-general coupon_pop_2">拿到 Gooddesign 新開幕折扣竟然只需要幾秒鐘 !!</strong>
        <a href="#" class="bg-first m-2 p-2 text-second rounded-pill coupon_pop_3" @click.prevent="getCoupon">click here</a>
    </div>
    <!-- 特色介紹區塊 -->
    <div class="row no-gutters aboutus">
      <div class=" col-md-4 p-2 animated" v-for="item in aboutUsImg" :key="item.key" :id="item.key">
        <div class="aboutus_card">
          <img :src="item.url" width="150" alt />
          <div class="title">{{item.title}}</div>
          <div class="content">{{item.content}}</div>
        </div>
      </div>
    </div>
    <div class="border-bottom"></div>
    <!-- Modal -->
    <div class="modal fade" id="getCoupon" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-first text-common">
            <h5 class="modal-title" id="exampleModalCenterTitle">恭喜你獲得本周優惠</h5>
            <button type="button" class="close text-second" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <table class="table">
              <tbody>
                <tr>
                  <td class="border-0">優惠券：</td>
                  <td class="text-left border-0">{{coupopforcustom.title}}</td>
                </tr>
                <tr>
                  <td class="border-0">折扣碼：</td>
                  <td class="text-left border-0">{{coupopforcustom.code}}</td>
                </tr>
              </tbody>
            </table>
            <ins class="text-success">限會員享用九折優惠，優惠期間不限次數使用，祝您購物愉快</ins>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-general" data-dismiss="modal">關閉</button>
            <router-link class="btn btn-first" to="/products" data-dismiss="modal">購物去</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      swiperAllProducts: {
        slidesPerView: 5,
        spaceBetween: 50,
        loopFillGroupWithBlank: true,
        height: 300,
        loop: true,
        speed: 1000,
        // init: false,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        breakpoints: {
          1024: {
            slidesPerView: 4,
            spaceBetween: 40
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 10
          }
        }
      },
      // swiper資料，一個大坑
      swiperBanner: {
        autoplay: {
          disableOnInteraction: false, // 用户操作后是否禁止自动循环
          delay: 4000 //  自动循环时间
        }, // 可选选项，自动滑动
        speed: 3000, // 切换速度，即slider自动滑动开始到结束的时间（单位ms）
        loop: true, //  循环切换
        grabCursor: false, // 设置为true时，鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状
        // setWrapperSize: true, //Swiper使用flexbox布局(display: flex)，开启这个设定会在Wrapper上添加等于slides相加的宽或高，在对flexbox布局的支持不是很好的浏览器中可能需要用到。
        autoHeight: true, //  自动高度。设置为true时，wrapper和container会随着当前slide的高度而发生变化。
        scrollbar: '.swiper-scrollbar', //  显示滚动条
        mousewheelControl: true, // 设置为true时，能使用鼠标滚轮控制slide滑动
        observeParents: false, // 当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper

        pagination: {
          el: '.swiper-pagination',
          // type : 'progressbar', // 分页器形状
          clickable: true //  点击分页器的指示点分页器会控制Swiper切换
        },
        navigation: {
          // nextEl,prevEl為navigation方法
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      aboutUsImg: [
        //  建議將絕對路徑修正成正確路徑，你原本的路徑還需要往更上一層，require 前面不用使用 ` 且 () 內多一個單引號，key 的值最開頭不可有 0 ，
        {
          url: require('../assets/img-1.png'),
          title: '集結世界各地好設計',
          content:
            'Gathering good designers everywhere in the world,includes so many kinds of art and handmade culture.',
          key: 'card-1'
        },
        {
          url: require('../assets/img-2.png'),
          title: '富含創意的高品質設計',
          content:
            'After our team review and choice , we do our best to give what you guys deserve the good design.',
          key: 'card-2'
        },
        {
          url: require('../assets/img-3.png'),
          title: '設計師與顧客的保障',
          content:
            'Be a good bridge between designer and customers,good buy for good life.',
          key: 'card-3'
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
          key: 2
        },
        {
          imgurl:
            require('../assets/banner-3.jpg'),
          key: 3
        }
      ],
      swiperOnSale: {
        slidesPerView: 5,
        spaceBetween: 50,
        autoHeight: true,
        loopFillGroupWithBlank: true,
        height: 300,
        loop: true,
        speed: 1000,
        // init: false,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        breakpoints: {
          1024: {
            slidesPerView: 4,
            spaceBetween: 40
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 10
          }
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      fullWidth: 0,
      fullHeight: 0
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  methods: {
    getWindow () {
      $(window).scroll(function () {
        let scrollPos = $(window).scrollTop()
        // console.log(scrollPos)
        $('.aboutus').each(function () {
          let card = document.getElementById('card-1')
          let cardPos = card.getBoundingClientRect().top
          if (scrollPos >= cardPos) {
            $('.coupon_pop_1').addClass('fadeIn')
            setTimeout(() => {
              $('.coupon_pop_2').addClass('fadeIn')
            }, 1000)
            setTimeout(() => {
              $('.coupon_pop_3').addClass('fadeIn')
            }, 2000)
            $('#card-1').addClass('fadeIn')
            setTimeout(() => {
              $('#card-2').addClass('fadeIn')
            }, 750)
            setTimeout(() => {
              $('#card-3').addClass('fadeIn')
            }, 1500)
          }
        })
      })
    },
    getCoupon () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
      vm.$http.post(api).then(response => {
        if (response.data.success) {
          $('#getCoupon').modal('show')
        } else {
          this.$store.dispatch('updateMessage', { message: response.data.message, status: 'mistake' })
        }
      })
    },
    getProducts () {
      this.$store.dispatch('getProducts')
    },
    openProduct (id) {
      let routerPush = this.$router.push({
        path: '/productpage',
        query: { id: id }
      })
      console.log(routerPush)
    },
    addCart (id) {
      this.$store.dispatch('addCart', id)
    },
    addFavor (e) {
      this.$store.dispatch('addFavor', e)
    }
  },
  computed: {
    ...mapGetters(['onsale', 'favoProduct', 'products', 'isLoading',
      'coupopforcustom', 'origin_products'])
  },
  created () {
    this.$store.dispatch('refresh')
    this.getProducts()
    this.getWindow()
  },
  mounted () {
    setTimeout(() => {
      $('.banner_log').addClass('fadeIn')
    }, 600)
  }
}
</script>

<style lang="scss" scoped>
strong {
  font-size: 18px;
}
.fa-cart-plus,
.fa-heart {
  font-size: 26px;
}
.aboutus {
  padding:20px;
  .aboutus_card {
    box-shadow: 0 3px 6px rgba(0,0,0,0.16);
    min-height: 365px;
  }
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
  box-shadow: 1px 1px 1px $shadow;
  background-image: url("../assets/chevron-right-solid.svg");
}
.swiper-container {
  width: 100%;
  height: 400px;
  @media (max-width: 992px) {
    height: 380px;
  }
  @media (max-width: 768px) {
    height: 300px;
  }
  @media (max-width: 576px) {
    height: 180px;
  }
  // margin: 20px auto;
}
.swiper-container-2 {
  height: 0px;
  min-height: 350px;
  .swiper-container-2 del {
    font-size: 14px;
  }
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
  box-shadow: 1px 1px 1px $shadow;
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
@mixin title () {
    min-height: 50px;
    line-height: 50px;
    @media (max-width: 568px) {
      line-height: 25px;
    }
}
.title {
    @include title;
}

@mixin couponpop{
  opacity: 0;
  transition: all 2s;
}
.coupon_pop_1 ,.coupon_pop_2,.coupon_pop_3{
  @include couponpop;
}
// .easeOut {
//   opacity: 1;
//   transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
// }
// animated
.animated {
  opacity: 0;
  transition: all 1s;
  transform: translateY(50px);
}
.animated-top {
  opacity: 0;
  transition: all 1s;
  transform: translateY(-50px);
}
.fadeIn {
  opacity: 1;
  transform: translateY(0);
}
.home_banner {
  background-image: url(../assets/home_banner.jpg);
  background-size:cover;
  background-position: center center;
  height: 600px;
  margin-top:-70px;
  @media (max-width:768px) {
    height:400px;
  }
  .banner_log{
    color:$common;
    font-size: 30px;
  }
}

</style>

<template>
  <div>
    <div class="home_banner text-center d-flex">
      <strong class="banner_log my-auto mx-auto animated-top">Get design what you deserve.<br>帶走屬於你的好設計</strong>
    </div>
    <loading :active.sync="isLoading"></loading>
    <!-- swiper 主要產品區塊 -->
    <div class="container newArrival p-md-0">
      <div class="text-center p-3">
        <strong class="px-3 py-2 text-primary bg-secondary">New Arrival</strong>
      </div>
      <swiper :options="swiperAllProducts" class="swiper-container-2">
        <swiper-slide v-for="item in newArrival_products" :key="item.id">
          <a href="#" @click.prevent="openProduct(item.id)">
            <img :src="item.imageUrl" alt class="card-img-top img-fluid" style="min-height:150px;" />
          </a>
          <div class="title">{{item.title}}</div>
          <div class="text-left ">{{item.description}}</div>
          <div class="text-right heartSpan">
            <i
              class="far fa-heart mr-1 text-primary"
              v-if="item.isFavor != true"
              @click.prevent="addFavor(item)"
            ></i>
            <i
              class="fas fa-heart mr-1 text-primary"
              v-if="item.isFavor === true"
              @click.prevent="addFavor(item)"
            ></i>
          </div>
          <div class="d-flex">
            <strong
              class="mr-auto"
              v-if="item.price == item.origin_price"
            >{{item.origin_price|currency}}</strong>
            <a
              href="#"
              class="text-general d-md-none pr-1 cart_button"
              @click.prevent="addCartModal(item)"
            >
              <i class="fas fa-cart-plus"></i>
            </a>
            <a
              href="#"
              class="text-general text-right d-none d-md-inline col-md-6 pr-1 cart_button"
              @click.prevent="addCartModal(item)"
            >
              <i class="fas fa-cart-plus"></i>
            </a>
          </div>
        </swiper-slide>
    </swiper>
    </div>
    <div class="container">
    </div>
    <!-- swiper banner圖片區塊 -->
    <swiper :options="swiperBanner" class="container p-0">
      <swiper-slide v-for="item in SwiperImgs" :key="item.key" >
        <img :src="item.imgurl" class="img-fluid"/>
      </swiper-slide>
      <div class="swiper-button-next" slot="button-prev"></div>
      <div class="swiper-button-prev" slot="button-next"></div>
      <!-- <div class="swiper-pagination" slot="pagination"></div> -->
    </swiper>
    <!-- swiper更多優惠區塊 -->
    <div class="onsale container p-md-0">
      <div class="text-center p-3">
        <strong class="px-3 py-2 text-primary bg-secondary">On Sale</strong>
      </div>
      <swiper :options="swiperOnSale" class="swiper-container-2">
        <swiper-slide v-for="item in onsale" :key="item.id">
          <a href="#" @click.prevent="openProduct(item.id)">
            <img :src="item.imageUrl" alt class="card-img-top img-fluid" style="min-height:150px;" />
          </a>
          <div class="title">{{item.title}}</div>
          <div class="text-left d-none d-md-block">{{item.description}}</div>
          <div class="text-right heartSpan">
            <i
              class="far fa-heart mr-1 text-primary"
              v-if="item.isFavor != true"
              @click.prevent="addFavor(item)"
            ></i>
            <i
              class="fas fa-heart mr-1 text-primary"
              v-if="item.isFavor === true"
              @click.prevent="addFavor(item)"
            ></i>
          </div>
          <div class="d-flex align-items-end">
            <div
              class=""
              v-if="item.price == item.origin_price"
            >{{item.origin_price|currency}}</div>
            <del
              class=" "
              v-if="item.price !== item.origin_price"
            >{{item.origin_price|currency}}</del>
            <strong
              class="mr-auto ml-2"
              v-if="item.price !== item.origin_price"
            >{{item.price|currency}}</strong>
            <a
              href="#"
              class="text-general pr-1 cart_button"
              @click.prevent="addCartModal(item)"
            >
              <i class="fas fa-cart-plus"></i>
            </a>
          </div>
        </swiper-slide>
        <div class="swiper-button-next swiper-button-next-2" slot="button-prev"></div>
        <div class="swiper-button-prev swiper-button-prev-2" slot="button-next"></div>
      </swiper>
    </div>
    <!-- 提領優惠 -->
    <div class="bg-secondary py-4 px-2 rounded">
        <strong class="text-primary coupon_pop_1">即日起，</strong>
        <strong class="text-primary coupon_pop_2">登入會員即可獲得 GoodDesign 本週新開幕折扣</strong>
        <a href="#" class="bg-primary d-inline-block m-2 px-2 py-1 text-secondary rounded coupon_pop_3" @click.prevent="getCoupon"><strong>click here</strong></a>
    </div>
    <!-- 特色介紹區塊 -->
    <div class="row no-gutters aboutus">
      <div class=" col-md-4 p-2 animated" v-for="item in aboutUsImg" :key="item.key" :id="item.key">
        <div class="aboutus_card">
          <img :class="'aboutus_img_'+ item.num" @mouseenter="showAboutUs(item.num)" @mouseleave="removeShowAboutUs(item.num)" :src="item.url" />
          <div :class="'aboutus_title_'  + item.num">{{item.title}}</div>
          <div :class="'aboutus_content_' + item.num">{{item.content}}</div>
        </div>
      </div>
    </div>
    <div class="border-bottom"></div>
    <!-- 優惠券Modal -->
    <div class="modal fade" id="getCoupon" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-primary text-common">
            <h5 class="modal-title" id="exampleModalCenterTitle">恭喜你獲得本周優惠</h5>
            <button type="button" class="close text-secondary" data-dismiss="modal" aria-label="Close">
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
            <router-link class="btn btn-primary" to="/products" data-dismiss="modal">購物去</router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- 加入購物車Modal -->
      <div class="modal fade" :class="{'show':isFileLoading}" id="ProductModal" style="top:250px;" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header bg-primary text-common">
              <h5 class="modal-title" id="exampleModalLabel">{{addCartTemplate.title}}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click.prevent="cleanTemplate()">
                <span class="text-secondary" aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row no-gutters">
                <div class="col-md-6">
                  <img :src="addCartTemplate.imageUrl" width="150" height="120">
                </div>
                <div class="col-md-6">
                  <div class="text-left pb-2">類型：{{addCartTemplate.category}}</div>
                  <div class="text-left pb-2">設計師：{{addCartTemplate.description}}</div>
                  <div class="input-group">
                    <select class="custom-select" id="inputGroupSelect01" v-model="addCartTemplate.qty">
                    <option v-for="item in 10" :key="item">{{item}}</option>
                  </select>
                  <span class="p-2">{{addCartTemplate.unit}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <i class="fas fa-circle-notch fa-spin" v-if="isFileLoading"></i>
              <button type="button" class="btn btn-general" data-dismiss="modal" @click.prevent="cleanTemplate()">取消</button>
              <button id="addCartButton" type="button" class="btn btn-primary" @click.prevent="addCart(addCartTemplate)">加入購物車</button>
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
        loop: false,
        speed: 1000,
        // init: false,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          // nextEl: '.swiper-button-next',
          // prevEl: '.swiper-button-prev'
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
          delay: 6000 //  自动循环时间
        }, // 可选选项，自动滑动
        speed: 1000, // 切换速度，即slider自动滑动开始到结束的时间（单位ms）
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
          url: require('../assets/img-1.jpg'),
          title: '集結世界各地好設計',
          content:
            '從來自世界各地願意合作的設計師分享，匯集在一起提供給每一位顧客',
          key: 'card-1',
          num: 1
        },
        {
          url: require('../assets/img-2.jpg'),
          title: '富含創意的高品質設計',
          content:
            '透過顧客使用心得透明化，提供消費者更明確的資訊做參考，透過良性競爭間接提高商品品質',
          key: 'card-2',
          num: 2
        },
        {
          url: require('../assets/img-3.jpg'),
          title: '設計師與顧客的保障',
          content:
            '明確制定完整的消費準則，避免不必要的時間花費及遺漏資訊，更保障設計師與顧客的權益',
          key: 'card-3',
          num: 3
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
      fullHeight: 0,
      addCartTemplate: {},
      isPaying: false
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
            setTimeout(() => {
              $('.coupon_pop_3').addClass('bounceIn')
            }, 3000)
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
          this.showModal = true
        } else {
          this.$store.dispatch('updateMessage', { message: response.data.message, status: 'mistake' })
        }
      })
    },
    openProduct (id) {
      this.$router.push({
        path: '/productpage',
        query: { id: id }
      })
    },
    addCart (item) {
      this.isPaying = true
      this.$store.dispatch('addCart', item)
      document.getElementById('addCartButton').disabled = true
    },
    addCartModal (item) {
      if (this.isPaying === false) {
        $('#ProductModal').modal('show')
        this.addCartTemplate = Object.assign({}, item)
        this.$set(this.addCartTemplate, 'qty', 1)
        this.$store.dispatch('updateModalDisplay', 'block')
      }
    },
    cleanTemplate () {
      this.addCartTemplate = {}
    },
    addFavor (e) {
      this.$store.dispatch('addFavor', e)
    },
    showAboutUs (num) {
      $('.aboutus_title_' + num).addClass('show_aboutus')
      $('.aboutus_content_' + num).addClass('show_aboutus')
    },
    removeShowAboutUs (num) {
      $('.aboutus_title_' + num).removeClass('show_aboutus')
      $('.aboutus_content_' + num).removeClass('show_aboutus')
    }
  },
  // 監聽ModalDisplay關閉購買商品modal
  watch: {
    ModalDisplay () {
      if (this.ModalDisplay === 'none') {
        $('#ProductModal').modal('hide')
        this.isPaying = false
        document.getElementById('addCartButton').disabled = false
      }
    }
  },
  computed: {
    ...mapGetters(['onsale', 'favoProduct', 'products', 'isLoading',
      'coupopforcustom', 'newArrival_products', 'isFileLoading', 'ModalDisplay', 'cartNum'])
  },
  created () {
    this.$store.dispatch('getCart')
    this.$store.dispatch('refresh')
    this.$store.dispatch('getFilterProducts')
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
  font-size: 16px;
}
del {
  font-size: 14px;
}
.fa-cart-plus,
.fa-heart {
  transition: transform 0.1s ease-out;
  font-size: 26px;
  &:hover{
    transform: scale(0.9);
  }
  &:active {
    transform: scale(0.9);
  }
}

// aboutus

.aboutus {
  .aboutus_card {
    margin:20px;
    position: relative;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16);
    height:350px;
    .aboutus_img_1,.aboutus_img_2,.aboutus_img_3 {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width:100%;
      height:100%;
      transition: all 0.3s;
      opacity: 1;
      &:hover{
        filter:brightness(0.7);
      }
    }
    .aboutus_title_1,.aboutus_title_2,.aboutus_title_3 {
      position: absolute;
      top: 5%;
      left:5%;
      z-index: 9;
      color: $common;
      font-weight: 900;
      font-size: 18px;
      transition: all 0.3s;
      opacity: 0;
    }
    .aboutus_content_1,.aboutus_content_2,.aboutus_content_3 {
      position: absolute;
      bottom:5%;
      left:5%;
      z-index: 9;
      color: $common;
      font-size:18px;
      font-family: sans-serif;
      overflow: hidden;
      text-align: left;
      transition: all 0.3s;
      opacity: 0;
    }
    .show_aboutus{
      opacity: 1;
    }
  }
  li {
    font-size: 16px;
  }
}

// swiper樣式

%swiper-prev-next {
  background-color: rgba(255, 255, 255, 0.8);
  width: 37px;
  height: 54px;
  box-shadow: 1px 1px 1px $shadow;
  background-image: url("../assets/chevron-right-solid.svg");
}
.swiper-container {
  width: 100%;
  height: 525px;
  @media (max-width: 992px) {
    height: 330px;
  }
  @media (max-width: 768px) {
    height: 250px;
  }
  @media (max-width: 576px) {
    height: 220px;
  }
  @media (max-width: 375px) {
    height: 160px;
  }
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
  @extend %swiper-prev-next;
}
.swiper-button-prev {
  @extend %swiper-prev-next;
  background-image: url("../assets/chevron-left-solid.svg");
}

.swiper-button-next-2{
  top:30%;
  right:5px;
  @extend %swiper-prev-next;
}
.swiper-button-prev-2{
  top:30%;
  left:5px;
  @extend %swiper-prev-next;
  background-image: url("../assets/chevron-left-solid.svg");
}
.swiper-slide {
  justify-content: center;
}

// card

.card-img-top {
  border-radius: 0;
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
.heartSpan {
  height: 30px;
}
</style>

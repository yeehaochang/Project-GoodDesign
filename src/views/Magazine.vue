<template>
  <div class="wrap">
    <div class="scoll-top-list">
      <a href="1" class="scoll-top text-general rounded p-1 m-2" @click.prevent="goSlide">禮物包裝是種禮儀！</a>
      <a
        href="2"
        class="scoll-top text-general rounded p-1 m-2"
        @click.prevent="goSlide"
      >2019 限塑新政策！</a>
      <a href="3" class="scoll-top text-general rounded p-1 m-2" @click.prevent="goSlide">單身又怎樣？</a>
      <small class="mt-3 text-first"><i class="fas fa-mouse-pointer mr-1"></i>點擊他們來導航</small >
    </div>
    <!-- 1 -->
    <div class="magbg" v-for="item in magData" :key="item.num" id="1">
      <div class="back row no-gutters">
        <div class="col-10 col-md-5 col-lg-5">
          <div class="imgboard">
            <img :src="item.imgurl" width="100%" alt />
          </div>
        </div>
        <div class="col-10 col-md-5">
          <h2 id="title-1" class="magtitle animated-top">{{item.title}}</h2>
          <p id="content-1" class="px-2 animated">{{item.content}}</p>
        </div>
      </div>
    </div>
    <!-- 2 -->
    <div class="magbg mt-0 magbg-2" id="2">
      <div class="back back-2 row no-gutters">
        <div class="col-10 col-md-5 d-none d-md-block">
          <h2 id="title-2" class="magtitle animated-top">2019 限塑新政策！環保吸管「徹底清洗」教學＋ 9 款材質推薦評比</h2>
          <p id="content-2" class="text-white p-2 animated">
            從口號、潮流，到今天的全民意識，「環保」是離不開大家的生活議題，新的「限塑政策」將在七月登場，
            今天就讓小編來示範環保吸管的正確清洗方式吧！若還沒開始使用，不知道哪種材質較好？小編也蒐集了功能好用、方便清潔的環保吸管推薦給大家唷～
          </p>
        </div>

        <div class="col-10 col-md-5 col-lg-5">
          <div class="imgboard">
            <img
              src="https://cdn03.pinkoi.com/pinkoi.magz/jyecD7eR/15615427858674.jpg"
              width="100%"
              alt
            />
          </div>
        </div>
        <div class="col-10 d-md-none">
          <h2 id="mag-2" class="magtitle">2019 限塑新政策！環保吸管「徹底清洗」教學＋ 9 款材質推薦評比</h2>
        </div>
      </div>
    </div>
    <!-- 3 -->
    <div class="magbg mt-0" id="3">
      <div class="back row no-gutters">
        <div class="col-10 col-md-5 col-lg-5">
          <div class="imgboard">
            <img
              src="https://image.cache.storm.mg/styles/smg-800x533-fp/s3/media/image/2017/12/05/20171205-053855_U3927_M355553_5889.jpg?itok=1M7pAF0D"
              width="100%"
              alt
            />
          </div>
        </div>
        <div class="col-10 col-md-5 d-none d-md-block">
          <h2 id="title-3" class="magtitle animated-top">單身又怎樣？台北3間絕美乾燥花咖啡店，找個周末下午跟自己約會也超浪漫</h2>
          <p id="content-3" class="p-2 animated">
            這幾年各種風貌的咖啡廳一間間開，受到韓流影響，乾燥花風格的咖啡廳更是陸續在台灣掀起一股濃濃少女心咖啡廳的浪潮。乾燥花比鮮花更耐久，乾燥過程中的顏色變化更能讓空間氛圍有所不同
            ，相當適合裝飾店面。而台北也成為乾燥花咖啡廳的一級戰區，今天小編首要推薦妳3家台北絕美的乾燥花咖啡廳，一個人也能好好約會。
          </p>
        </div>

        <div class="col-10 d-md-none">
          <h2 class="magtitle">2019 限塑新政策！環保吸管「徹底清洗」教學＋ 9 款材質推薦評比</h2>
        </div>
      </div>
    </div>

    <div class="magfooter text-right p-2 d-flex">
      <span class="text-white ml-auto mt-auto">以上資料來自pinkoi，本頁面並無商業用途。僅供作業練習</span>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import attr from "jquery";

export default {
  data() {
    return {
      magData: [
        {
          num: 0,
          title:
            "禮物包裝是種禮儀！英國達人超簡易圖解５種包裝技法，手笨一族也學得會",
          imgurl:
            "https://image.cache.storm.mg/styles/smg-800x533-fp/s3/media/image/2017/12/11/20171211-014607_U10834_M357286_3000.jpg?itok=uruUT31h",
          content:
            "禮物包裝的第一步是挑選適合收禮者的主題包裝紙，不同主題的包裝紙裝載著各式各樣想要表達的情緒；接下來是挑選適合的緞帶、吊牌甚至各種裝飾物。"
        }
      ],
      Position:'',
      scrollPos:'',
      windowHeight:'',
      fullHeight: document.documentElement.clientHeight
    };
  },
  methods: {
    goSlide(event) {
      let el = event.currentTarget;
      let target = $(el).attr("href");
      let pos = document.getElementById(target);
      let targetPos = pos.getBoundingClientRect().top;
      this.targetPosition = targetPos;
      console.log(target,targetPos);
      $("html, body").animate({ scrollTop: targetPos }, 1000);
    },
    getWindow(){
      $(window).scroll(function(){
      let scrollPos = $(window).scrollTop();
      let windowHeight = $(window).height();
      // console.log(scrollPos, windowHeight);

      $('#1').each(function(){
        let a = document.getElementById('1');
        let targetPos = a.getBoundingClientRect().top;
        if( scrollPos >= targetPos ){
          $('#content-1').addClass('fadeIn');
          $('#title-1').addClass('fadeIn');
        }
      });
      $('#2').each(function(){
        let a = document.getElementById('2');
        let targetPos = a.getBoundingClientRect().top;
        if( scrollPos >= targetPos ){
          $('#content-2').addClass('fadeIn');
          $('#title-2').addClass('fadeIn');
        }
      });
      $('#3').each(function(){
        let a = document.getElementById('3');
        let targetPos = a.getBoundingClientRect().top;
        if( scrollPos >= targetPos ){
          $('#content-3').addClass('fadeIn');
          $('#title-3').addClass('fadeIn');
        }
      });

    });
    },
    
  },
  computed: {
  },
  mounted() {
  },
  created(){
    this.getWindow();
    // console.log(this.$refs)
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  background-image: url(../../assets/bg-2.jpg);
  background-attachment: fixed;
  background-position: center center;
  background-size: cover;
  overflow: hidden;
}
.scoll-top-list {
  display: flex;
  .scoll-top {
    background-color: $white;
  }
}
.magbg {
  transform: rotate(-7deg);
  padding: 80px 0px 60px 0px;
  margin: 100px -80px 0px -80px;
  background-color: rgba(255, 255, 255, 0.9);
}

.magbg-2 {
  @include blue-gradual();
}
.back {
  padding: 10px;
  margin-left: 15%;
  height: 300px;
  transform: rotate(7deg);
}
.imgboard {
  border: 1px $white solid;
  padding: 5px;
  margin: 0px 10px;
}

.magtitle {
  margin-top: -30px;
  padding: 20px;
  color: $general;
  font-size: 20px;
  background-color: rgba(255, 255, 255, 0.9);
}
p {
  text-indent: 2em;
  overflow: hidden;
}
.magfooter {
  margin-top: -70px;
  padding: 100px 0px;
  height: 200px;
  @include red-gradual();
}
// animated
.animated {
  opacity: 0;
  transition: all 1.0s;
  transform: translateY(50px);
}
.animated-top {
  opacity: 0;
  transition: all 1.0s;
  transform: translateY(-50px);
}
.fadeIn {
  opacity: 1;
  transform: translateY(0);
}
#content-1,#content-2,#content-3{
  @media (max-width:768px) {
    display: none;
  }
}
</style>
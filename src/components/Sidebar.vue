<template>
  <div>
    <!-- 商品種類 -->
    <div class="p-1 d-none d-sm-block bg-second text-main">
      <small>商品分類</small>
    </div>
    <div class="list-group list-group-horizontal">
      <a
        href="#"
        class="list-group-item rounded-0"
        v-for="item in categorybar"
        :key="item"
        @click.prevent="chooseCategory(item)"
      >{{item}}</a>
    </div>
    <a href="#" class="form-check my-2 p-2 border border-first text-first" v-if="!isFavorite" @click.prevent="chooseFavorite">
      <i class="far fa-heart mr-1"></i><span>顯示我的最愛</span>
    </a>
    <a href="#" class="form-check my-2 p-2 border border-first text-white bg-first" v-if="isFavorite" @click.prevent="chooseFavorite">
      <i class="far fa-heart mr-1"></i><span>顯示我的最愛</span>
    </a>
    <!-- 價格篩選 -->
    <div class="p-1 bg-second text-main">
      <small>價格篩選</small>
    </div>
    <div class="p-2">
      <form>
        <div class="form-check text-left">
          <input
            class="form-check-input"
            type="radio"
            name="exampleRadios"
            id="exampleRadios1"
            value="0"
            v-model="checkvalue"
            checked
          />
          <label
            class="form-check-label d-flex jusify-content-between"
            for="exampleRadios1"
          >$ 0 - 500</label>
        </div>
        <div class="form-check text-left">
          <input
            class="form-check-input"
            type="radio"
            name="exampleRadios"
            id="exampleRadios2"
            v-model="checkvalue"
            value="1"
          />
          <label class="form-check-label" for="exampleRadios2">$ 500 - 1,000</label>
        </div>
        <div class="form-check text-left">
          <input
            class="form-check-input"
            type="radio"
            name="exampleRadios"
            id="exampleRadios3"
            v-model="checkvalue"
            value="2"
          />
          <label class="form-check-label" for="exampleRadios3">$ 1,000 - 10,000</label>
        </div>

        <div>
          <div class="form-group text-left">
            <label for="min_price" class="">起始金額</label>
            <input
              type="number"
              v-model="priceType.minprice"
              @change="refresh"
              class="form-control"
              id="min_price"
              v-validate="'required'"
              name="minprice"
              placeholder
            />
            <small class="text-danger" v-if="errors.has('minprice')">欄位不得為空</small>
          </div>
          <div class="form-group"></div>
          <div class="form-group text-left">
            <label for="max_price">最高金額</label>
            <input
              type="number"
              class="form-control"
              v-model="priceType.maxprice"
              @change="refresh"
              id="max_price"
              v-validate="'required'"
              name="maxprice"
              placeholder
            />
            <small class="text-danger" v-if="errors.has('maxprice')">欄位不得為空</small>
          </div>
        </div>
        <button class="btn btn-general" @click.prevent="chooseFilter">送出</button>
      </form>
    </div>
  </div>
</template>


<script>
export default {
  props: ["categorybar"],
  data() {
    return {
      checkvalue: {},
      priceType: {
        minprice: "",
        maxprice: ""
      },
      isFavorite:false
    };
  },
  methods: {
    chooseFavorite(){
      this.isFavorite =! this.isFavorite;
      this.$emit("recentFavorite");
    },
    chooseCategory(item) {
      this.$emit("recentCategory", item);
    },
    chooseFilter() {
      this.checkType();
      if(this.priceType.maxprice >= this.priceType.minprice){
        this.$emit("recentfilter", this.priceType);
      }else{
        this.$bus.$emit("message:push", '最高金額不得低於起始金額', "danger");
      }
      // console.log(this.checkvalue);
      // console.log(this.priceType);
    },
    checkType() {
      switch (this.checkvalue) {
        case "0":
          this.priceType.minprice = 0;
          this.priceType.maxprice = 500;
          break;
        case "1":
          this.priceType.minprice = 500;
          this.priceType.maxprice = 1000;
          break;
        case "2":
          this.priceType.minprice = 1000;
          this.priceType.maxprice = 10000;
          break;
      }
    },
    refresh() {
      this.checkvalue = "";
    }
  },
  computed: {
    checkTypeComputed() {
      switch (this.checkvalue) {
        case "0":
          this.priceType.minprice = 0;
          this.priceType.maxprice = 500;
          break;
        case "500":
          this.priceType.minprice = 500;
          this.priceType.maxprice = 1000;
          break;
        case "1000":
          this.priceType.minprice = 1000;
          this.priceType.maxprice = 10000;
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
a {
  font-size: 15px;
}
.list-group {
  @media (max-width: 575px) {
    .list-group-item {
      display: flex;
      // width: 65px;
      // writing-mode: vertical-lr;
      display: inline-block;
      line-height: 30px;
      // background-color: rgha(255,255,255,0.8);
    }
    display: flex;
  }
}
.list-group-item {
  // border:2px $main solid;
  color:$general;
  &:focus {
    background-color: $second;
    color: $main;
  }
}
</style>

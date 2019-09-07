<template>
  <div>
    <!-- 商品種類 -->
    <div class="p-1 bg-second text-main">
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
    <div class="p-1 bg-second text-main">
      <small>設計師</small>
    </div>
    <div class="list-group">
      <a
        href="#"
        class="list-group-item rounded-0"
        v-for="item in designerbar"
        :key="item"
        @click.prevent="chooseDesigner(item)"
      >{{item}}</a>
    </div>
    <!-- 價格篩選 -->
    <div class="p-1 bg-second text-main mt-2">
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
            @change="refreshPriceType"
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
            @change="refreshPriceType"
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
            @change="refreshPriceType"
          />
          <label class="form-check-label" for="exampleRadios3">$ 1,000 - 10,000</label>
        </div>

        <div>
          <div class="form-row">
            <div class="form-group col-6 col-md-12 text-left">
            <label for="min_price" class="">起始金額</label>
            <input
              type="number"
              v-model="priceType.minprice"
              @change="refreshCheckvalue"
              class="form-control"
              id="min_price"
              v-validate="'required'"
              name="minprice"
              placeholder
            />
            <small class="text-danger" v-if="errors.has('minprice') && checkvalue === ''">欄位不得為空</small>
          </div>
            <div class="form-group col-6 col-sm-12 text-left">
            <label for="max_price">最高金額</label>
            <input
              type="number"
              class="form-control"
              v-model="priceType.maxprice"
              @change="refreshCheckvalue"
              id="max_price"
              v-validate="'required'"
              name="maxprice"
              placeholder
            />
            <small class="text-danger" v-if="errors.has('maxprice') && checkvalue === ''">欄位不得為空</small>
          </div>
          </div>
        </div>
        <button class="btn btn-general" @click.prevent="chooseFilter">送出</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ['categorybar', 'designerbar'],
  data () {
    return {
      checkvalue: {},
      priceType: {
        minprice: '',
        maxprice: ''
      },
      isFavorite: false
    }
  },
  methods: {
    chooseFavorite () {
      this.isFavorite = !this.isFavorite
      this.$emit('recentFavorite')
    },
    chooseCategory (item) {
      this.$emit('recentCategory', item)
    },
    chooseDesigner (item) {
      this.$emit('recentDesigner', item)
    },
    chooseFilter () {
      this.checkType()
      if (this.priceType.minprice === '' || this.priceType.maxprice === '') {
        this.$bus.$emit('message:push', '金額欄位不得為空', 'danger')
      } else {
        if (parseInt(this.priceType.maxprice) >= parseInt(this.priceType.minprice)) {
          this.$emit('recentfilter', this.priceType)
        } else {
          this.$bus.$emit('message:push', '最高金額不得低於起始金額', 'danger')
        }
      }
    },
    checkType () {
      switch (this.checkvalue) {
        case '0':
          this.priceType.minprice = 0
          this.priceType.maxprice = 500
          break
        case '1':
          this.priceType.minprice = 500
          this.priceType.maxprice = 1000
          break
        case '2':
          this.priceType.minprice = 1000
          this.priceType.maxprice = 10000
          break
      }
    },
    refreshCheckvalue () {
      if (this.checkvalue !== '') {
        this.checkvalue = ''
      }
    },
    refreshPriceType () {
      if (this.priceType.minprice !== '' && this.priceType.maxprice !== '') {
        this.priceType.minprice = ''
        this.priceType.maxprice = ''
      }
    }
  },
  created () {
    this.checkType()
  }
}
</script>

<style lang="scss" scoped>
a {
  font-size: 15px;
}
.list-group {
  @media (max-width: 575px) {
    .list-group-item {
      display: flex;
      display: inline-block;
      line-height: 30px;
    }
    display: flex;
  }
}
.list-group-item {
  color:$general;
  &:focus {
    background-color: rgba(246, 235,140,0.4);
    color: $main;
  }
}
</style>

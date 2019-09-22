<template>
  <div>
    <!-- 商品種類 -->
    <div class="p-1 bg-secondary text-primary tag_board">
      <span class="tag_name">商品分類</span>
    </div>
    <div class="list-group list-group-horizontal row no-gutters">
      <a
        href="#"
        class="list-group-item col rounded-0"
        v-for="item in categorybar"
        :key="item"
        @click.prevent="chooseCategory(item)"
      >{{item}}</a>
    </div>
    <a href="#" class="form-check my-2 p-2 border border-primary text-primary " v-if="!isFavorite" @click.prevent="chooseFavorite">
      <i class="far fa-heart mr-1 "></i><span>顯示我的最愛</span>
    </a>
    <a href="#" class="form-check my-2 p-2 border border-primary text-common bg-primary" v-if="isFavorite" @click.prevent="chooseFavorite">
      <i class="far fa-heart mr-1"></i><span>顯示我的最愛</span>
    </a>
    <div class="p-1 bg-secondary text-primary tag_board">
      <span class="tag_name">設計師</span>
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
    <div class="p-1 bg-secondary text-primary mt-2 tag_board">
      <span class="tag_name">價格篩選</span>
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
            v-model="checkvalueTemplate"
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
            v-model="checkvalueTemplate"
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
            v-model="checkvalueTemplate"
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
              v-model="priceTypeTemplate.minprice"
              @change="refreshCheckvalue"
              class="form-control"
              id="min_price"
              v-validate="'required'"
              name="minprice"
              placeholder
            />
            <!-- <small class="text-danger" v-if="errors.has('minprice') && checkvalue === ''">欄位不得為空</small> -->
          </div>
            <div class="form-group col-6 col-md-12 text-left">
            <label for="max_price">最高金額</label>
            <input
              type="number"
              class="form-control"
              v-model="priceTypeTemplate.maxprice"
              @change="refreshCheckvalue"
              id="max_price"
              v-validate="'required'"
              name="maxprice"
              placeholder
            />
            <!-- <small class="text-danger" v-if="errors.has('maxprice') && checkvalue === ''">欄位不得為空</small> -->
          </div>
          </div>
        </div>
        <button class="btn btn-general" @click.prevent="submitFilter">送出</button>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  props: ['categorybar', 'designerbar'],
  data () {
    return {
      checkvalueTemplate: '',
      priceTypeTemplate: {
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
      // this.$emit('recentCategory', item)
      this.$store.dispatch('getFilterProducts', item)
    },
    chooseDesigner (item) {
      // this.$emit('recentDesigner', item)
      this.$store.dispatch('getDesigner', item)
    },
    submitFilter () {
      let valueSwitchType = {
        minprice: '',
        maxprice: ''
      }
      if (this.checkvalueTemplate === '0') {
        valueSwitchType.minprice = 0
        valueSwitchType.maxprice = 500
        this.$store.dispatch('getfilter', valueSwitchType)
      } else if (this.checkvalueTemplate === '1') {
        valueSwitchType.minprice = 500
        valueSwitchType.maxprice = 1000
        this.$store.dispatch('getfilter', valueSwitchType)
      } else if (this.checkvalueTemplate === '2') {
        valueSwitchType.minprice = 1000
        valueSwitchType.maxprice = 10000
        this.$store.dispatch('getfilter', valueSwitchType)
      } else {
        if (this.priceTypeTemplate.minprice === '' || this.priceTypeTemplate.maxprice === '') {
          this.$store.dispatch('updateMessage', { message: '金額欄位不得為空', status: 'mistake' })
        } else {
          if (parseInt(this.priceTypeTemplate.maxprice) >= parseInt(this.priceTypeTemplate.minprice)) {
            this.$store.dispatch('getfilter', this.priceTypeTemplate)
          } else {
            this.$store.dispatch('updateMessage', { message: '最高金額不得低於起始金額', status: 'mistake' })
          }
        }
      }
    },
    refreshCheckvalue () {
      this.checkvalueTemplate = ''
    },
    refreshPriceType () {
      this.priceTypeTemplate = {
        minprice: '',
        maxprice: ''
      }
    }
  },
  created () {
    this.checkvalueTemplate = ''
    this.priceTypeTemplate = {
      minprice: '',
      maxprice: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.tag_board{
  @include card_3d;
}
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
  @include card_3d;
  transition: transform 0.1s ease-out;
  color:$general;
  &:active {
    transform: scale(0.9);
  }
}
</style>

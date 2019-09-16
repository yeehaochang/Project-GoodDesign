<template>
  <div>
    <div class="d-flex justify-content-center align-items-center py-4" style="position:relative">
      <slot name="back">
      <a class="back text-general" href="#" @click.prevent="back">
        <i class="fas fa-arrow-left"></i>
        回上一步</a>
      </slot>

      <div class="progress-border">
        <div class="progress">
          <span>1</span>
        </div>
      </div>
      <div class="progress-title">購物車</div>
      <div class="progress-line"></div>

      <slot name="progress-2">
        <div class="unprogress-border">
          <div class="progress">
            <span>2</span>
          </div>
        </div>
        <div class="progress-title">訂單 & 付款</div>
        <div class="unprogress-line"></div>
      </slot>

      <slot name="progress-3">
        <div class="unprogress-border">
          <div class="progress">
            <span>3</span>
          </div>
        </div>
        <div class="progress-title">結帳完成</div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    back () {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.back{
  font-size:16px;
  font-weight: bold;
  top:20px;
  left: 10px;
}
.progress-border {
  margin-left: 10px;
  min-width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: $first;
  .progress {
    position: relative;
    top: 5px;
    left: 5px;
    // border: common 2px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: $common;
    span {
      color: $first;
      font-weight: bold;
      font-size: 20px;
      position: absolute;
      top: 4%;
      left: 30%;
    }
  }
}
.progress-line {
  width: 5%;
  height: 4px;
  background-color: $general;
}
.progress-title {
  font-weight: bold;
  padding: 8px;
}
.unprogress-border {
  margin-left: 10px;
  min-width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: $shadow;
  .progress {
    position: relative;
    top: 5px;
    left: 5px;
    // border: common 2px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: $common;
    span {
      color: $shadow;
      font-weight: bold;
      font-size: 20px;
      position: absolute;
      top: 4%;
      left: 30%;
    }
  }
}
.unprogress-line {
  width: 5%;
  height: 4px;
  background-color: $shadow;
}
</style>

<template>
  <div>
    <a
      href="#"
      class="message-button text-common"
      data-toggle="modal"
      data-target="#feedbackModal"
      @click.prevent="showMessage"
    >
      <i class="far fa-smile mb-1"></i>F e e d b a c k
    </a>
    <div id="message" class="animated">
      <strong>您對網站的評價為何?</strong>
      <div class="message-body">
        <div class="d-flex align-items-center justify-content-between">
          <a id="20" @mouseover="selectScore" @mouseout="outScore" @click.prevent="giveScore" :class="{'fa-2x':ScoreType === '20'}">
            <i class="far fa-meh-rolling-eyes fa-2x text-primary"></i>
            <small class="d-none scoretext" :class="{'d-block':ScoreType === '20'}">糟糕</small>
          </a>
          <a id="40" @mouseover="selectScore" @mouseout="outScore" @click.prevent="giveScore" :class="{'fa-2x':ScoreType === '40'}">
            <i class="far fa-sad-tear fa-2x text-primary"></i>
            <small class="d-none scoretext" :class="{'d-block':ScoreType === '40'}">差</small>
          </a>
          <a id="60" @mouseover="selectScore" @mouseout="outScore" @click.prevent="giveScore" :class="{'fa-2x':ScoreType === '60'}">
            <i class="far fa-meh fa-2x text-primary"></i>
            <small class="d-none scoretext" :class="{'d-block':ScoreType === '60'}">普通</small>
          </a>
          <a id="80" @mouseover="selectScore" @mouseout="outScore" @click.prevent="giveScore" :class="{'fa-2x':ScoreType === '80'}">
            <i class="far fa-smile-beam fa-2x text-primary"></i>
            <small class="d-none scoretext" :class="{'d-block':ScoreType === '80'}">還不賴</small>
          </a>
          <a id="100" @mouseover="selectScore" @mouseout="outScore" @click.prevent="giveScore" :class="{'fa-2x':ScoreType === '100'}">
            <i class="far fa-grin-squint fa-2x text-primary"></i>
            <small class="d-none scoretext" :class="{'d-block':ScoreType === '100'}">太棒了</small>
          </a>
        </div>
      </div>
      <div class="message-footer">
        <span class="text-success">謝謝您寶貴的評分!!</span>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  data () {
    return {
      ScoreType: ''
    }
  },
  methods: {
    showMessage () {
      $('#message').toggleClass('fadeIn')
      $('.message-footer').hide()
    },
    selectScore (event) {
      let e = event.currentTarget.id
      this.ScoreType = ''
      $('#' + e)
        .addClass('fa-2x')
        .removeClass('opacity')
        .siblings()
        .removeClass('fa-2x')
        .addClass('opacity')
      $('#' + e).children('.scoretext').removeClass('d-none')
    },
    outScore (event) {
      let e = event.currentTarget.id
      $('#' + e)
        .removeClass('fa-2x')
        .siblings()
        .removeClass('opacity')
      $('#' + e).children('.scoretext').addClass('d-none')
    },
    giveScore (event) {
      let e = event.currentTarget.id
      this.ScoreType = e
      console.log(e)
      // let stringE = JSON.stringify(e)
      localStorage.setItem('score', e)
      $('#' + e).addClass('fa-2x')
      $('.message-footer').show()
      $('#message').removeClass('fadeIn')
      // $(".message-body").fadeToggle(500);
      this.getScore()
    },
    getScore () {
      let value = localStorage.getItem('score')
      this.ScoreType = value
    }
  },
  created () {
    this.getScore()
  }
}
</script>

<style lang="scss" scoped>
.opacity {
  opacity: 0.5;
}
#message {
  // display: none;
  position: fixed;
  top: 400px;
  right: 60px;
  padding: 10px;
  height: 150px;
  width: 300px;
  background-color: $common;
  box-shadow: 0px 0px 2px $general;
  z-index: 10;
}
.message-button {
  background-color:$primary;
  color:$common;
  position: fixed;
  padding: 12px;
  top: 400px;
  right: 0px;
  -webkit-writing-mode: vertical-lr;
  writing-mode: vertical-lr;
  z-index: 10;
  &:hover {
    box-shadow: 1px 1px 5px $general;
    opacity: 0.9;
  }
}
.message-body {
  position: fixed;
  top: 60px;
  right: 40px;
}
.message-body div{
  width: 210px;
  height: 70px;
}
.message-footer {
  display: none;
  position: fixed;
  top: 150px;
  right: 80px;
}
.animated {
  opacity: 0;
  transition: all 0.8s;
  transform: translateX(20px);
}
.fadeIn {
  opacity: 1;
  transform: translateY(0);
}
</style>

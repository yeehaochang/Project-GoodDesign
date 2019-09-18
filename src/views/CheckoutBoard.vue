<template>
  <div>
    <Alert></Alert>
    <Navbar></Navbar>
    <div class="toparea">
    </div>
    <div class="container middlearea">
      <router-view></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
// import "../assets/all.scss";
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Alert from '../components/Alert'

export default {
  data () {
    return {}
  },
  components: {
    Footer,
    Navbar,
    Alert
  }
}
</script>

<style lang="scss" scoped>
.toparea{
  padding-top: 70px;
  @media (max-width: 575px) {
    padding-top:100px;
  }
}
.middlearea {
  min-height: 666px;
}
</style>

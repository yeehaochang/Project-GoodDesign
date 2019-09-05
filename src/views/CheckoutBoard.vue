<template>
  <div class="container p-0">
    <GoTop></GoTop>
    <Navbar></Navbar>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
// import "../assets/all.scss";
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import GoTop from '../components/GoTop'

export default {
  data () {
    return {}
  },
  components: {
    Footer,
    Navbar,
    GoTop
  }
}
</script>

<style lang="scss" scoped>

</style>

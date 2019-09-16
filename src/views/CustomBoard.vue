<template>
  <div>
    <Alert></Alert>
    <Message></Message>
    <div>
      <Navbar></Navbar>
      <div class="toparea">
      </div>
      <router-view></router-view>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Message from '../components/Message'
import Alert from '../components/Alert'

export default {
  name: 'customboard',
  data () {
    return {
      searchText: ''
    }
  },
  methods: {
    goSearch (text) {
      this.$router.push({
        path: '/products',
        query: {
          t: text
        }
      })
      this.$bus.$emit('getSearchText', text)
    }
  },
  components: {
    Navbar,
    Footer,
    Message,
    Alert
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
td {
  text-align: left;
  // line-height: 100px;
}

.mainNavbar{
  padding-top:67px;
}
.toparea{
  padding-top: 70px;
  @media (max-width: 575px) {
    padding-top:100px;
  }
}
</style>

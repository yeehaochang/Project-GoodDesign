<template>
  <div>
    <Alert></Alert>
    <div class="container-fluid">
      <BackNavbar></BackNavbar>
      <div class="row no-gutters">
        <div class="col-md-2">
          <BackSidebar></BackSidebar>
        </div>
        <div class="col-md-10">
          <div class="p-1">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BackNavbar from '../components/Back-Navbar'
import BackSidebar from '../components/Back-Sidebar'
import Alert from '../components/Alert'

export default {
  data () {
    return {}
  },
  components: {
    BackNavbar,
    BackSidebar,
    Alert
  }
}
</script>

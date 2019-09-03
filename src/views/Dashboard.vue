<template>
  <div>
    <GoTop></GoTop>
    <div class="container p-0">
      <BackNavbar></BackNavbar>
      <div class="row no-gutters">
        <div class="col-md-2 col-12">
          <BackSidebar></BackSidebar>
        </div>
        <div class="col-12 col-md-10">
          <div class="p-1">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import BackNavbar from "../components/Back-Navbar";
import BackSidebar from "../components/Back-Sidebar";
import GoTop from "../components/GoTop";

export default {
  data() {
    return {};
  },
  components: {
    BackNavbar,
    BackSidebar,
    GoTop
  }
};
</script>

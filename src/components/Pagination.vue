<template>
  <div class="mx-auto mt-4">
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{'disabled':!propspage.has_pre}" :disabled="!propspage.has_pre">
          <!-- 上一頁 -->
          <a class="page-link" href="#" aria-label="Previous"  @click.prevent="changePage(propspage.current_page -1)">
            <i class="fas fa-chevron-left"></i>
          </a>
        </li>
        <li
          class="page-item"
          v-for="item in propspage.total_pages"
          :key="item"
          @click.prevent="changePage(item)"
          :class="{'active':item === propspage.current_page}"
        >
          <a class="page-link" href="#">{{item}}</a>
        </li>
        <li class="page-item" :class="{'disabled':!propspage.has_next}" :disabled="!propspage.has_next">
          <!-- 下一頁 -->
          <a class="page-link" href="#" aria-label="Next"  @click.prevent="changePage(propspage.current_page +1)">
            <i class="fas fa-chevron-right"></i>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: ["propspage"],
  data() {
    return {
        pagination:{},
    };
  },
  methods: {
    changePage(num) {
      this.$emit("emitpage", num);
    },
  },
};
</script>

<style lang="scss" scoped>


// .disabled { pointer-events: none; }
</style>
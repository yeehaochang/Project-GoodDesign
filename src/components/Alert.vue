<template>
  <div class="message-alert">
    <div
      class="alert alert-dismissible"
      :class="'alert-' + item.status"
      v-for="(item, i) in messages"
      :key="i"
    >
      {{ item.message }}
      <button
        type="button"
        class="close"
        @click="removeMessage(i)"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
    }
  },
  methods: {
    updateMessage (message, status) {
      this.$store.dispatch('updateMessage', { message, status })
    },
    removeMessage (num) {
      this.$store.dispatch('removeMessage', num)
    }
  },
  computed: {
    messages () {
      return this.$store.state.messages
    }
  },
  created () {
    // 自定義名稱 'messsage:push'
    // message: 傳入參數
    // status: 樣式，預設值為 warning
    // this.$bus.$on('message:push', (message, status = 'warning') => {
    //   this.updateMessage(message, status)
    // })
    // vm.$bus.$emit('message:push');
  }
}
</script>

<style scope>
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 56px;
  right: 20px;
  z-index: 1100;
}
</style>

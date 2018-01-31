<template>
  <div class="notification" :class="getClass()">
    <button type="button" class="delete" @click="close"></button>
    {{message.text}}
  </div>
</template>

<script>
export default {
  props: ['message'],
  methods: {
    getClass () {
      const type = this.message.type
      console.log(type)

      switch (type) {
        case 'success':
          return 'is-success'
        case 'error':
          return 'is-danger'
        case 'warning':
          return 'is-warning'
        default:
          return 'is-primary'
      }
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.notification {
  margin-bottom: 10px;
}
</style>

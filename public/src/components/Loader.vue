<template>
  <div class="loader-wrapper">
    <vue-spinner></vue-spinner>
  </div>
</template>

<script>
import GridLoader from 'vue-spinner/src/GridLoader'

export default {
  components: {
    'vue-spinner': GridLoader
  }
}
</script>

<style scoped>
.loader-wrapper{
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255,255,255,0.8);
  z-index: 10;
}
</style>

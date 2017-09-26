<template>
  <transition name="modal">
    <div class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <slot name="before-header"></slot>
          <p class="modal-card-title">{{ title }}</p>
          <button class="delete" @click="$emit('close')"></button>
          <slot name="after-header"></slot>
        </header>
        <section class="modal-card-body">
          <slot name="body"></slot>
        </section>
        <footer class="modal-card-foot">
          <slot name="footer"></slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style scoped>
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>

<template>
  <div class="mapmarker__loader">
    <img src="/static/marker-adopted.svg" alt="">
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
@keyframes mapmarker {
  0% {
    -webkit-transform: scale(7);
            transform: scale(7);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
    opacity: 0;
  }
  38% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
    opacity: 1;
  }
  55% {
    -webkit-transform: scale(1.5);
            transform: scale(1.5);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  72% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  81% {
    -webkit-transform: scale(1.24);
            transform: scale(1.24);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  89% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  95% {
    -webkit-transform: scale(1.04);
            transform: scale(1.04);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
}

.mapmarker__loader{
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 1000;
  animation: mapmarker 2s infinite;
}
</style>

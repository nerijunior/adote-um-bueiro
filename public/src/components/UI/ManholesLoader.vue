<template>
  <div class="manholes__loader">
    <div class="container">
      <div class="manhole abandoned">
        <img src="/static/marker-abandoned.png" alt="">
      </div>
      <div class="manhole warning">
        <img src="/static/marker-warning.png" alt="">
      </div>
      <div class="manhole happy">
        <img src="/static/marker-adopted.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
@keyframes abandoned {
  0% {
    -webkit-transform: translateX(100%);
            transform: translateX(100%);
    opacity: 0;
  }

  70% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }

  100%{
    opacity: 0;
  }
}

@keyframes warning {
  0% {
    -webkit-transform: translateX(100%);
            transform: translateX(100%);
    opacity: 0;
  }

  80% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }

  100%{
    opacity: 0;
  }
}

@keyframes happy {
  0% {
    -webkit-transform: translateX(100%);
            transform: translateX(100%);
    opacity: 0;
  }

  90% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }

  100%{
    opacity: 0;
  }
}

.manholes__loader{
  position: absolute;
  left: 0;
  width: 100%;
  top: 50%;
  z-index: 1000;
  background-color: white;
  padding: 50px;
}

.manholes__loader .container{
  display: block;
  width: 120px;
  margin: auto;
}

.manholes__loader .manhole{
  display: block;
  float: left;
  margin-right: 10px;
  width: 27px;
  height: 42px;
}

.manholes__loader .manhole img{
  position: absolute;
  bottom: 0;
}

.manholes__loader .abandoned{
  animation: abandoned 1.5s infinite;
}

.manholes__loader .warning{
  animation: warning 1.5s infinite;
}

.manholes__loader .happy{
  animation: happy 1.5s infinite;
}
</style>

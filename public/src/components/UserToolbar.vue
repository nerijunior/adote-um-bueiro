<template>
  <div id="user-toolbar">
    <div class="field">
      <div class="field" v-if="user._id">
        <router-link class="button is-fullwidth" to="profile">
          <span class="icon"><i class="fa fa-user"></i></span>
          <span>{{ user.name }}</span>
        </router-link>
      </div>

      <div class="field">
        <router-link v-if="!user._id" to="signin" class="button is-primary is-fullwidth">
          <span class="icon"><i class="fa fa-sign-in"></i></span>
          <span>Entrar</span>
        </router-link>
        <button v-if="user._id" type="button" @click="logout" class="button is-danger is-fullwidth"><i class="fa fa-sign-out"></i> Sair</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    logout () {
      window.localStorage.removeItem('token')
      this.$store.commit('SET_USER', {})
    }
  }
}
</script>

<style scoped>
#user-toolbar{
  position: absolute;
  top: 10px;
  right: 10px;
  width: 150px;
  background-color: white;
  z-index: 1000;
  padding: 5px;
  border-radius: 5px;
}
</style>

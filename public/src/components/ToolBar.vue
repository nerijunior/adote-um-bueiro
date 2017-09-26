<template>
  <div id="toolbar">
    <div class="field">
      <button @click="create" class="button is-fullwidth is-info">
        <span class="icon"><i class="fa fa-plus-circle"></i> </span>
        <span>Criar</span>
      </button>
    </div>

    <div v-if="manhole._id">
      <div class="field">
        <button @click="adotar" v-if="!manhole.adopted" class="button is-fullwidth is-primary"><i class="fa fa-rocket"></i> Adotar</button>
        <button @click="abandon" v-if="manhole.adopted && loggedUser._id && manhole.user_id === loggedUser._id" class="button is-fullwidth is-danger"><i class="fa fa-sign-out"></i> Abandonar</button>
      </div>
      <div class="field">
        <button @click="alertar" :disabled="!loggedUser._id || manhole.user_id === loggedUser._id" v-if="manhole.adopted" class="button is-fullwidth is-warning"><i class="fa fa-warning"></i> Alertar Dono</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    loggedUser () {
      return this.$store.state.user || {}
    }
  },
  props: ['manhole'],
  methods: {
    adotar () {
      // validation
      if (this.manhole.user_id) {
        return
      }

      // user logged?
      if (!this.loggedUser._id) {
        return this.$router.push('/signin')
      }

      window.swal({
        title: 'Tem certeza?',
        text: 'Ao adotar um bueiro, você concorda em receber alertas para mante-lo sempre limpo.',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then(response => {
          if (response) {
            window.axios.post(`/manhole/${this.manhole._id}/adopt`)
              .then(response => {
                this.$emit('updatedManhole', response.data)
              })
              .catch(error => {
                console.error(error)
              })
          }
        })
    },
    abandon () {
      // user is the owner?
      if (this.manhole.user_id !== this.loggedUser._id) {
        return
      }

      // remove user_id
      const id = this.manhole._id
      window.axios.post(`/manhole/${id}/abandon`)
        .then(response => {
          this.$emit('updatedManhole', response.data)
        })
        .catch(error => {
          console.error(error)
        })
    },
    alertar () {
      // last update more than a week?
      // send alert
    },
    create () {
      // User logged?
      if (!this.loggedUser._id) {
        return this.$router.push('/signin')
      }

      this.$emit('new-manhole')
    }
  }
}
</script>

<style scoped>
#toolbar{
  position: absolute;
  top: 10px;
  left: 10px;
  width: 200px;
  background-color: black;
  z-index: 1000;
  border-radius: 5px;
  padding: 5px;
}
</style>

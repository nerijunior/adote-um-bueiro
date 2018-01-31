<template>
  <div v-if="loggedUser.name" id="toolbar">
    <div class="field">
      <button @click="create" class="button is-fullwidth is-info">
        <span class="icon"><i class="fa fa-plus-circle"></i> </span>
        <span>Criar Bueiro</span>
      </button>
    </div>

    <div v-if="manhole._id">
      <div class="field">
        <button @click="adopt" v-if="!manhole.adopted" class="button is-fullwidth is-primary"><i class="fa fa-rocket"></i> Adotar</button>
        <button @click="abandon" v-if="manhole.adopted && loggedUser._id && manhole.user_id === loggedUser._id" class="button is-fullwidth is-danger">
          <span class="icon"><i class="fa fa-sign-out"></i></span>
          <span>Abandonar</span>
        </button>
      </div>
      <div class="field">
        <button @click="alertar" :disabled="!loggedUser._id || manhole.user_id === loggedUser._id" v-if="manhole.adopted" class="button is-fullwidth is-warning">
          <span class="icon"><i class="fa fa-warning"></i></span>
          <span>Alertar Dono</span>
        </button>
      </div>
      <div class="field">
        <button @click="takeCare" :disabled="!loggedUser._id" v-if="manhole.adopted" class="button is-fullwidth is-success">
          <span class="icon"><i class="fa fa-check-circle"></i></span>
          <span>Cuidar</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/api'

export default {
  computed: {
    loggedUser () {
      return this.$store.state.user || {}
    }
  },
  props: ['manhole'],
  methods: {
    adopt () {
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
        text: 'Ao adotar um bueiro, você concorda em receber alertas para mante-lo sempre limpo, ok?',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then(response => {
          if (response) {
            const manholeId = this.manhole._id

            Api.manholeAdopt(manholeId)
              .then(response => {
                this.$emit('updatedManhole', response.data.manhole)
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

      window.swal({
        title: 'Tem certeza?',
        text: 'Abandonando o bueiro você deixará ele sujo, triste e a cidade corre o risco de alagar. :(',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then(response => {
          if (!response) {
            return
          }

          Api.manholeAbandon(id)
            .then(response => {
              this.$emit('updatedManhole', response.data.manhole)
            })
            .catch(error => {
              console.error(error)
            })
        })
    },
    takeCare () {
      // user is the owner?
      if (this.manhole.user_id !== this.loggedUser._id) {
        return
      }

      this.$emit('manholeTakeCare', this.manhole)
    },
    alertar () {
      // last update more than a week?
      // and not alerted yet
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
  z-index: 1;
  border-radius: 5px;
  padding: 5px;
}
</style>

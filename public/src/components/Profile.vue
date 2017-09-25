<template>
  <div class="container">
    <section class="hero">
      <div class="hero-body">
        <h1 class="title">{{ user.name }}</h1>
        <h2 class="subtitle">Confira e atualize suas informações.</h2>
      </div>
    </section>

    <form @submit.prevet="save">
      <div v-if="errors.length" class="notification is-danger">
        <ul>
          <li v-for="error in errors"><small>{{ error.field }}</small> {{ error.message }}</li>
        </ul>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label for="name" class="label">Nome</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <input type="text" v-model="user.name" class="input" :class="{ 'is-danger' : ($v.user.name.$error) }">
            </p>
          </div>
        </div>
      </div>
      <!-- /.field -->

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label for="email" class="label">Email</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <input type="text" v-model="user.email" class="input" :class="{ 'is-danger' : ($v.user.email.$error) }">
            </p>
          </div>
        </div>
      </div>
      <!-- /.field -->

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label for="email" class="label">Alterar Senha</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <input type="password" v-model="user.password" class="input">
            </p>
          </div>
          <div class="field">
            <p class="control">
              <input type="password" v-model="user.password_confirmation" class="input">
            </p>
          </div>
        </div>
      </div>
      <!-- /.field -->

      <div class="field is-horizontal">
        <div class="field-label"></div>
        <div class="field-body">
          <div class="field is-grouped">
            <div class="control">
              <button class="button is-success">
                <span class="icon"><i class="fa fa-rocket"></i></span>
                <span>Registrar</span>
              </button>
            </div>
            <div class="control">
              <router-link to="/" class="button is-link">Voltar</router-link>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  validations: {
    user: {
      name: { required },
      email: { required, email }
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  data () {
    return {
      errors: []
    }
  },
  methods: {
    save () {
      if (this.$v.$invalid) {
        return this.$v.$touch()
      }

      let data = {
        name: this.user.name,
        email: this.user.email
      }

      if (this.user.password) {
        data.password = this.user.password
        data.password_confirmation = this.user.password_confirmation
      }

      this.$store.commit('LOADING', true)

      window.axios.put('/me', data)
        .then(response => {
          this.$store.commit('SET_USER', response.data)
        })
        .catch(error => {
          console.error(error)
        })
        .then(() => {
          this.$store.commit('LOADING', false)
        })
    }
  }
}
</script>

<style scoped>
</style>

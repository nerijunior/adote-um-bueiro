<template>
  <div class="container">
    <section class="hero">
      <div class="hero-body">
        <h1 class="title">Registrar</h1>
        <h2 class="subtitle">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium tenetur unde, optio dignissimos, laboriosam vel sit, nulla repudiandae voluptates quas magni eveniet dicta inventore laborum hic atque! Harum tempora, iste.</h2>
      </div>
    </section>
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <form @submit.prevet="save">
          <div v-if="errors.length" class="notification is-danger">
            <ul>
              <li v-for="error in errors"><small>{{ error.field }}</small> {{ error.message }}</li>
            </ul>
          </div>

          <div class="field">
            <label for="name" class="label">Nome</label>
            <input type="text" v-model="name" class="input" :class="{ 'is-danger' : ($v.name.$error) }">
          </div>
          <!-- /.field -->

          <div class="field">
            <label for="email" class="label">Email</label>
            <input type="email" v-model="email" class="input" :class="{ 'is-danger' : ($v.email.$error) }">
            <p class="help is-danger" v-show="$v.email.$error && !$v.email.$email">Email inválido</p>
          </div>
          <!-- /.field -->

          <div class="columns">
            <div class="column is-6">
              <div class="field">
                <label for="password" class="label">Senha</label>
                <input type="password" v-model="password" class="input" :class="{ 'is-danger' : ($v.password.$error) }">
              </div>
            </div>

            <div class="column is-6">
              <div class="field">
                <label for="" class="label">Confirmar Senha</label>
                <input type="password" v-model="password_confirmation" class="input" :class="{ 'is-danger' : ($v.password_confirmation.$error) }">
              </div>
            </div>
          </div>
          <!-- /.columns -->

          <div class="field is-grouped">
            <button class="button is-success">
              <span class="icon"><i class="fa fa-rocket"></i></span>
              <span>Registrar</span>
            </button>

            <button class="button is-link">Voltar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import { getErrors } from '@/api/helpers'

export default {
  validations: {
    name: { required },
    email: { required, email },
    password: { required },
    password_confirmation: { required }
  },
  data () {
    return {
      errors: [],
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
  },
  methods: {
    save () {
      if (this.$v.$invalid) {
        return this.$v.$touch()
      }

      const data = {
        name: this.name,
        email: this.email,
        password: this.password
      }

      window.axios.post('/signup', data)
        .then(response => {
          const user = response.data.user
          const token = response.data.token

          window.localStorage.setItem('token', token)
          this.$store.commit('SET_USER', user)
          this.$router.push('/')
        })
        .catch(error => {
          const status = error.request.status

          if (status === 422) {
            this.errors = getErrors(error.request)
          } else {
            console.error(error)
          }
        })
    }
  }
}
</script>

<style scoped>
</style>

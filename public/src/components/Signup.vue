<template>
  <div class="container">
    <section class="hero">
      <div class="hero-body">
        <h1 class="title">Registrar</h1>
        <h2 class="subtitle">Crie sua conta e ajude a melhorar sua cidade! :)</h2>
      </div>
    </section>
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <form @submit.prevent="save">
          <div v-if="errors.length" class="notification is-danger">
            <ul>
              <li v-for="error in errors"><small>{{ error.field }}</small> {{ error.message }}</li>
            </ul>
          </div>

          <div class="field">
            <label for="name" class="label">Nome</label>
            <input type="text" v-model="name" class="input" :class="{ 'is-danger' : ($v.name.$error) }">
            <p class="help is-danger" v-show="$v.name.$error && !$v.name.$required">Nome é obrigatório</p>
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
                <p class="help is-danger" v-show="$v.password.$error && !$v.password.$required">Senha é obrigatório</p>
              </div>
            </div>

            <div class="column is-6">
              <div class="field">
                <label for="" class="label">Confirmar Senha</label>
                <input type="password" v-model="password_confirmation" class="input" :class="{ 'is-danger' : ($v.password_confirmation.$error) }">
                <p class="help is-danger" v-show="($v.password_confirmation.$error && !$v.password_confirmation.required)">Confirmar Senha é obrigatório</p>
                <p class="help is-danger" v-show="$v.password_confirmation.$error && !$v.password_confirmation.$sameAsPassword">As senhas não são idênticas</p>
              </div>
            </div>
          </div>
          <!-- /.columns -->

          <div class="field is-grouped">
            <button class="button is-success">
              <span class="icon"><i class="fa fa-rocket"></i></span>
              <span>Registrar</span>
            </button>

            <router-link to="/" tag="button" class="button is-link">Voltar</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, sameAs } from 'vuelidate/lib/validators'
import { getErrors } from '@/api/helpers'

export default {
  validations: {
    name: { required },
    email: { required, email },
    password: { required },
    password_confirmation: {
      required,
      sameAsPassword: sameAs('password')
    }
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

      this.$store.commit('LOADING', true)

      window.axios.post('/signup', data)
        .then(response => {
          const user = response.data.user
          const token = response.data.token

          window.localStorage.setItem('token', token)
          window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

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
        .then(() => this.$store.commit('LOADING', false))
    }
  }
}
</script>

<style scoped>
</style>

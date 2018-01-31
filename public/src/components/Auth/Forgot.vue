<template>
  <div class="container">
    <section class="hero">
      <div class="hero-body">
        <h1 class="title">Esqueceu sua senha?</h1>
      </div>
    </section>
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <div class="hello">

          <div v-if="message.type">
            <Notification v-if="message.type" @close="message = {}" :message="message"></Notification>
          </div>

          <form v-if="!sent" @submit.prevent="forgot">
            <div class="field">
              <label for="email" class="label">Email</label>
              <input type="email" v-model="email" class="input" :class="{ 'is-danger' : ($v.email.$error) }">
              <p class="help is-danger" v-show="$v.email.$error && !$v.email.$email">Email inválido</p>
            </div>
            <!-- /.field -->

            <div class="field">
              <vue-recaptcha sitekey="6LfvakMUAAAAAJQqhsc9Tvd82_Tii0-X0relffzp"
                @verify="changeCaptcha"
                @expirated="changeCaptcha(false)"></vue-recaptcha>
            </div>

            <div class="field is-grouped">
              <div class="control">
                <button type="submit" :disabled="!captchaResponse" class="button is-primary">Recuperar Senha</button>
              </div>
              <div class="control">
                <router-link to="login" class="button is-link">Entrar</router-link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/api'
import VueRecaptcha from 'vue-recaptcha'
import Notification from '@/components/UI/Notification'
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'forgot',
  components: { VueRecaptcha, Notification },
  data () {
    return {
      message: {
        type: null,
        text: ''
      },
      sent: false,
      email: '',
      captchaResponse: false
    }
  },
  validations: {
    email: { required, email }
  },
  methods: {
    changeCaptcha (response) {
      this.captchaResponse = response
    },
    forgot () {
      if (this.$v.$invalid) {
        return this.$v.$touch()
      }

      if (!this.captchaResponse) {
        return false
      }

      const data = {
        email: this.email,
        captcha: this.captchaResponse
      }

      Api.forgot(data)
        .then(response => {
          this.message = {
            type: 'success',
            text: 'Se o email existir em nossa base, você receberá um email para recuperar a senha!'
          }
          this.sent = true
        })
        .catch(error => {
          console.error(error)
          this.message = {
            type: 'error',
            text: 'Ocorreu algum problema, tente novamnete.'
          }
        })
    }
  }
}
</script>

<style scoped>
</style>

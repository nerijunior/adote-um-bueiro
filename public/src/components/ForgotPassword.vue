<template>
  <div class="container">
    <section class="hero">
      <div class="hero-body">
        <h1 class="title">Forgot Password</h1>
      </div>
    </section>

    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <div class="hello">

          <form @submit.prevent="forgot">
            <div class="field">
              <label for="email" class="label">Email</label>
              <input type="email" v-model="email" class="input">
            </div>

            <div class="field">
              <router-link to="signup" class="button is-info is-fullwidth">Registrar</router-link>
            </div>
          </form>

        </div>

      </div>
      <!-- /.column -->
    </div>
    <!-- /.columns -->
  </div>
</template>

<script>
export default {
  name: 'forgot',
  data () {
    return {
      email: ''
    }
  },
  methods: {
    login () {
      const data = {
        email: this.email
      }

      window.axios.post('/forgot', data)
        .then(response => {
          console.log(response, response.data)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>

<style>
</style>

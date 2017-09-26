<template>
  <div class="container">
    <section class="hero">
      <div class="hero-body">
        <h1 class="title">Login</h1>
      </div>
    </section>
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <div class="hello">
          <form @submit.prevent="login">
            <div class="field">
              <label for="email" class="label">Email</label>
              <input type="email" v-model="email" class="input">
            </div>

            <div class="field">
              <label for="password" class="label">Password</label>
              <input type="password" v-model="password" class="input">
            </div>

            <div class="field is-grouped">
              <div class="control">
                <button type="submit" class="button is-primary">Entrar</button>
              </div>
              <div class="control">
                <router-link to="logout" class="button is-link">Esqueceu sua senha?</router-link>
              </div>
            </div>

          </form>

          <hr>

          <div class="field">
            <router-link to="signup" class="button is-info is-fullwidth">Registrar</router-link>
          </div>

          <div class="field is-grouped">
            <button v-if="social.github" class="button is-fullwidth is-large is-github">
              <span class="icon"><i class="fa fa-github"></i></span>
            </button>
            <button v-if="social.google" class="button is-fullwidth is-large is-google">
              <span class="icon"><i class="fa fa-google"></i></span>
            </button>
            <button v-if="social.twitter" class="button is-fullwidth is-large is-twitter">
              <span class="icon"><i class="fa fa-twitter"></i></span>
            </button>
            <button v-if="social.facebook" class="button is-fullwidth is-large is-facebook">
              <span class="icon"><i class="fa fa-facebook"></i></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      email: '',
      password: '',
      social: {
        google: false,
        twitter: false,
        facebook: false,
        github: true
      }
    }
  },
  methods: {
    login () {
      const data = {
        email: this.email,
        password: this.password
      }

      window.axios.post('/signin', data)
        .then(response => {
          const user = response.data.user
          const token = response.data.token

          window.localStorage.setItem('token', token)

          this.$store.commit('SET_USER', user)

          // If the user comes from a auth route.
          if (this.$router.currentRoute.query.redirect) {
            this.$router.push(this.$router.currentRoute.query.redirect)
          } else {
            this.$router.push('/')
          }
        })
        .catch(error => {
          this.response = error
          console.error(error)
        })
    }
  }
}
</script>

<style>
.is-github{ background-color: #2b2b2b; color: white; }
.is-google{ background-color: #dd4b39; color: white;  }
.is-facebook{ background-color: #3b5998; color: white;  }
.is-twitter{ background-color: #55acee; color: white;  }

</style>

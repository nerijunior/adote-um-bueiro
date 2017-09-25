import Vue from 'vue'
import VueRouter from 'vue-router'

// Components
import MainMap from '@/components/MainMap'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import Profile from '@/components/Profile'

Vue.use(VueRouter)

let Router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'MainMap',
      component: MainMap
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Login,
      meta: { authenticated: 'guest' }
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: Signup,
      meta: { authenticated: 'guest' }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: { authenticated: true }
    }
  ]
})

Router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authenticated)) {
    const authType = to.meta.authenticated
    const token = window.localStorage.getItem('token')

    if (authType === 'guest' && token) {
      next({
        path: '/'
      })
    } else if (authType === true && !token) {
      next({
        path: '/signin',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default Router

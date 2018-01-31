import axios from 'axios'

class Api {
  constructor (config) {
    this.config = config
    this.client = this.getClient()
  }

  authenticate (token) {
    if (!token) {
      throw new Error('Can\'t set this token: ' + JSON.stringify(token))
    }

    window.localStorage.setItem('token', token)
    this.client.defaults.headers.common['Authorization'] = 'Bearer ' + token
  }

  getClient () {
    return axios.create({
      baseURL: '/api/',
      responseType: 'json'
    })
  }

  signup (data, autoLogin) {
    autoLogin = autoLogin || false

    const request = this.client.post('signup', data)

    if (autoLogin) {
      return request.then(response => {
        const token = response.data.token

        if (!token) {
          return Promise.reject(response)
        }

        this.authenticate(response.data.token)

        return Promise.resolve(response)
      })
    }

    return request
  }

  login (data) {
    return this.client.post('/signin', data)
      .then(response => {
        this.authenticate(response.data.token)

        return Promise.resolve(response)
      })
  }

  forgot (data) {
    return this.client.post('/forgot', data)
  }

  userProfile () {
    return this.client.get('/me')
  }

  getManholes (data) {
    return this.client.post('/points', data)
  }

  manholeAdopt (id) {
    return this.client.post('/manholes/adopt/', { id })
  }

  manholeAbandon (id) {
    return this.client.post('/manholes/abandon', {id})
  }

  manholeTakeCare (data) {
    return this.client.post('/manholes/take_care', data)
  }

}

export default new Api()

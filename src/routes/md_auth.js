const jwt = require('jsonwebtoken')
const config = require('../config')
const UserRepository = require('../repositories/UserRepository')

module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next()
  }

  let token = req.get('Authorization')

  if (token) {
    token = token.replace('Bearer ', '')
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        res.status(401).send('Invalid token')
      }

      UserRepository.byId(decoded.id)
        .then(response => {
          req.session.user = response
          next()
        })
        .catch(error => {
          throw error
        })
    })
  } else {
    res.status(401).send('Token não informado')
  }
}

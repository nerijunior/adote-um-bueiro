const jwt = require('jsonwebtoken')

const UserRepository = require('../repositories/UserRepository')
const config = require('../../config')

class MeController {
  see (req, res) {
    res.send(req.session.user)
  }

  update (req, res) {
    req.checkBody('name', 'Nome é obrigatório').notEmpty()
    req.checkBody('email', 'Email é obrigatório').notEmpty()
    req.checkBody('email', 'Email inválido').isEmail()

    const errors = req.validationErrors()

    if (errors) {
      return res.status(422).send(errors).json()
    }

    const id = req.session.user._id
    const data = {
      name: req.body.name,
      email: req.body.email
    }

    UserRepository.update(id, data)
      .then(user => {
        res.send(user)
      })
      .catch(error => {
        console.error(error)
      })

  }
}

module.exports = new MeController

const UserRepository = require('../repositories/UserRepository')
const config = require('../../config')
const jwt = require('jsonwebtoken')

module.exports = function (req, res) {
  req.checkBody('name', 'Nome é obrigatório').notEmpty()
  req.checkBody('email', 'Email é obrigatório').isEmail()
  req.checkBody('password', 'Senha é obrigatória').notEmpty()

  const errors = req.validationErrors()

  if (errors) {
    res.status(422).send(errors).json()
    return
  } else {

    const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    }

    UserRepository.save(data)
      .then(user => {
        const token = jwt.sign({'id': user._id}, config.secret)
        return res.json({user: user, token: token})
      })
      .catch(error => {
        throw error
      })
  }

}

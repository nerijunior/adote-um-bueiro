const User = require('../schemas/User')
const jwt = require('jsonwebtoken')
const config = require('../../config')
const bcrypt = require('bcrypt')

module.exports = function (req, res) {
  const email = req.body.email
  const password = req.body.password

  User.findOne({ email: email }, (err, user) => {
    if (err) throw err

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({error: 'Invalid credentials'})
    }

    const token = jwt.sign({'id': user._id}, config.secret)
    return res.json({user: user, token: token})
  })
}

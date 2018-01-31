const User = require('../schemas/User')
const jwt = require('jsonwebtoken')
const config = require('../config')
const bcrypt = require('bcrypt')

module.exports = function (req, res) {
  const email = req.body.email

  if (!email) {
    return res.json({ success: false, error: 'email não informado.' })
  }

  User.findOne({ email: email }, (err, user) => {
    if (err) throw err

    console.log('user', user)

    return res.json({ success: true })
  })
}

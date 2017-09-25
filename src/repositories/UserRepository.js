const User = require('../schemas/User')
const bcrypt = require('bcrypt')

class UserRepository {
  async byId (_id) {
    return User.findOne({ _id : _id}).exec()
  }

  async save (data) {

    let u = new User()

    if (data._id) {
      await User.findOne({ _id: data._id}, (err, doc) => {
        if (err) throw err

        u = doc
      })
    }

    Object.keys(data).map((key) => {
      const value = data[key]

      if (key !== 'password') {
        u[key] = value
      } else {
        u[key] = bcrypt.hashSync(value, 10)
      }
    })

    u.save()

    return u
  }

  async emailExists (email, cb) {
    return await User.findOne({ email: email })
  }

  async update (id, data) {
    try{
      const user = await User.findOne({ _id: id }).exec()

      Object.keys(data).map(key => {
        user[key] = data[key]
      })

      user.save()

      return user
    } catch (e) {
      throw e
    }
  }
}

module.exports = new UserRepository

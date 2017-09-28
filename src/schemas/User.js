const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongooseHidden = require('mongoose-hidden')({ defaultHidden: {} })

const UserSchema = new Schema({
  name: String,
  email: String,
  password: { type: String, hide: true },
  created_at: {
    type: Date,
    default: Date.now
  }
})

UserSchema.plugin(mongooseHidden)

module.exports = mongoose.model('User', UserSchema)

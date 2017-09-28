const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('Manhole', new Schema({
  name: String,
  adopted: Boolean,
  user_id: Schema.Types.ObjectId,
  location: {
    type: [Number],
    index: '2d'
  },
  last_alert: Date,
  user: Object
}))

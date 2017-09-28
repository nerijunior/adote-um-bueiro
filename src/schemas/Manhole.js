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
  created_at: {
    type: Date,
    default: Date.now
  },
  last_alert: Date,
  user: Object,
}))

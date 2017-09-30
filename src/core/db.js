const Mongoose = require('mongoose')
const config = require('../config')

Mongoose.Promise = global.Promise
const options = { useMongoClient: true }

Mongoose.connect(config.db.uri, options)
  .then(() => {
    console.log('connected')
  })
  .catch(console.error)

module.exports = Mongoose.connection

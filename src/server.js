const path = require('path')
require('dotenv').config({ path: path.dirname(__dirname) + '/.env' })
require('newrelic')

const express = require('express')
const session = require('express-session')
const validator = require('express-validator')
const http = require('http')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const Raven = require('raven')
const config = require('./config')
const db = require('./core/db')

Raven.config(process.env.SENTRY_DSN).install()

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: config.secret
}))

app.use(validator())

app.use(Raven.requestHandler())

const PORT = process.env.PORT || 3000

// Construct routes
require('./routes')(app)

app.use(express.static(path.dirname(__dirname) + '/public/dist'))

// 404
app.use('*', (req, res) => {
  res.status(404).send('Not found')
})

// Sentry
app.use(Raven.errorHandler())

// Error hadling
app.use(function(err, req, res, next) {
  console.error(err.stack)
  res.statusCode = 500
  res.send('Something broke! Error code: ' + res.sentry)
})

const server = http.createServer(app).listen(PORT, () => {
  console.log(`Server listening at: http://localhost:${PORT}`)
})

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

const config = require('./config')
const db = require('./core/db')

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: config.secret
}))

app.use(validator());

const PORT = process.env.PORT || 3000

// Construct routes
require('./routes')(app)

app.use(express.static(path.dirname(__dirname) + '/public/dist'))

// 404
app.use('*', (req, res) => {
  res.status(404).send('Not found')
})

// Error hadling
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const server = http.createServer(app).listen(PORT, () => {
  console.log(`Server listening at: http://localhost:${PORT}`)
})

const authenticated = require('./md_auth')

// Controllers
const MeController = require('../controllers/MeController')
const ManholeController = require('../controllers/ManholeController')

module.exports = function (express) {
  express.post('/api/signin', require('./login'))
  express.post('/api/signup', require('./signup'))
  express.post('/api/forgot', require('./forgot'))

  express.post('/api/points', require('./points'))
  express.get('/api/me', authenticated, MeController.see)
  express.put('/api/me', authenticated, MeController.update)

  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    express.get('/api/setup', require('./setup'))
  }

  express.post('/api/manhole/:id/abandon', authenticated, ManholeController.abandon)
  express.post('/api/manhole/:id/adopt', authenticated, ManholeController.adopt)
  express.post('/api/manhole/', authenticated, ManholeController.create)

  require('./manholes')(express)
}

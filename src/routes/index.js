const authenticated = require('./md_auth')

// Controllers
const MeController = require('../controllers/MeController')
const ManholeController = require('../controllers/ManholeController')

module.exports = function (express) {
  express.post('/api/signin', require('./login'))
  express.post('/api/signup', require('./signup'))

  express.post('/api/points', authenticated, require('./points'))
  express.get('/api/me', authenticated, MeController.see)
  express.put('/api/me', authenticated, MeController.update)
  express.get('/api/setup', authenticated, require('./setup'))

  express.post('/api/manhole/:id/abandon', authenticated, ManholeController.abandon)
  express.post('/api/manhole/:id/adopt', authenticated, ManholeController.adopt)
}

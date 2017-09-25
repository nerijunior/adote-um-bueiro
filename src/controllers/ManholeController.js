const ManholeRepository = require('../repositories/ManholeRepository')

class ManholeController {
  async adopt (req, res) {
    const user = req.session.user
    const id = req.params.id

    ManholeRepository.adopt(id, user)
      .then(response => {
        res.send(response)
      })
      .catch(error => {
        res.status(500).send(error)
      })
  }

  async abandon (req, res) {
    const user = req.session.user
    const id = req.params.id

    ManholeRepository.abandon(id, user)
      .then(response => {
        res.send(response)
      })
      .catch(error => {
        res.status(500).send(error)
      })
  }
}

module.exports = new ManholeController

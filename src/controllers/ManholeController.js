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

  async create (req, res) {
    req.checkBody('name', 'Nome é obrigatório').notEmpty()
    req.checkBody('location', 'Localização é obrigatória').notEmpty()

    const errors = req.validationErrors()

    if (errors) {
      return res.status(422).send(errors).json()
    }

    const user = req.session.user

    const data = {
      name: req.body.name,
      location: req.body.location,
      adopted: false
    }

    ManholeRepository.save(data)
      .then(response => {
        res.send(response)
      })
      .catch(error => {
        console.error(error)
      })
  }
}

module.exports = new ManholeController

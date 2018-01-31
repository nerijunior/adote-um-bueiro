const ManholeRepository = require('../../repositories/ManholeRepository')
const jwt = require('jsonwebtoken')
const config = require('../../config')
const bcrypt = require('bcrypt')
const authenticated = require('../md_auth')

module.exports = function (app) {

  app.post('/api/manholes/adopt', authenticated, async function (req, res) {
    const user = req.session.user
    const id = req.body.id

    const query = {
      _id: id
    }

    try {
      const adopted = await ManholeRepository.adopt(id, user)
      res.json({success: true, manhole: adopted})
    } catch (e) {
      res.status(500).json({error: e})
    }
  })

  app.post('/api/manholes/abandon', authenticated, async function (req, res) {
    const user = req.session.user
    const id = req.body.id

    try {
      const manhole = await ManholeRepository.abandon(id, user)
      res.json({ success: true, manhole: manhole })
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  })

  app.post('/api/manholes/take_care', authenticated, async function (req, res) {
    const user = req.session.user

    const manholeId = req.body.id
    const type      = req.body.type
    const date      = req.body.date

    try {
      const takeCare = await ManholeRepository.takeCare(manholeId, {type, date})
      res.json({ success: true })
    } catch (e) {
      res.status(400).json({ success: false, error: e });
    }
  })
}

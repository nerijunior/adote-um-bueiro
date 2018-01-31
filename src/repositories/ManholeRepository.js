const Manhole = require('../schemas/Manhole')
const User = require('../schemas/User')

class ManholeRepository {
  async adopt (id, user) {
    try {
      const manhole = await Manhole.findOne({ _id: id })

      if (!manhole || manhole.adopted) {
        return res.status(403).json({ success: false, error: 'manhole not exists or already adopted.' })
      }

      manhole.adopted = true
      manhole.user_id = user._id
      manhole.log = manhole.log || []
      manhole.log.push({
        type: 'adopted',
        user_id: user._id,
        created_at: new Date()
      })
      manhole.save()

      return manhole
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  async abandon (id, user) {
    const manhole = await Manhole.findOne({ _id: id })

    if (!manhole || !manhole.adopted || !user._id.equals(manhole.user_id)) {
      return res.status(403).json({ success: false, error: 'You shall not pass!' })
    }

    manhole.adopted = false
    manhole.user_id = null

    manhole.log = manhole.log || []
    manhole.log.push({
      type: 'abandoned',
      user_id: user._id,
      created_at: new Date()
    });

    manhole.last_update = undefined

    const saved = manhole.save()
    return saved
  }

  async save (data) {
    let manhole = new Manhole()

    if (data._id) {
      manhole = await Manhole.find({ _id : data._id }).exec()
    }

    Object.keys(data).map(key => {
      manhole[key] = data[key]
    })

    manhole.save()

    return manhole
  }

  async getAdopted () {
    const manholes = await Manhole.find({ adopted: true }).exec()

    const usersIds = manholes.map(manhole => {
      return manhole.user_id
    })
    const users = await User.find({ _id : { $in: usersIds } })

    return manholes.map((manhole) => {
      manhole.user = users.find((user) => {
        return user._id.equals(manhole.user_id)
      })

      return manhole
    })
  }

  async takeCare (_id, data) {
    const manhole = await Manhole.findOne({ _id: _id })

    manhole.log = manhole.log || []
    manhole.log.push({
      ...data,
      created_at: new Date()
    });

    manhole.last_update = new Date()

    const saved = manhole.save()
  }
}

module.exports = new ManholeRepository

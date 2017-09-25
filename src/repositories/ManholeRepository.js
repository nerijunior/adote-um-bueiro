const Manhole = require('../schemas/Manhole')

class ManholeRepository {
  async adopt (id, user) {
    try {
      const manhole = await Manhole.findOne({ _id: id })

      if (!manhole.adopted) {
        manhole.adopted = true
        manhole.user_id = user._id
        manhole.save()
      }

      return manhole
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  async abandon (id, user) {
    try {
      const manhole = await Manhole.findOne({ _id: id })

      if (manhole.adopted && manhole.user_id == user._id) {
        manhole.adopted = false
        manhole.user_id = null
        manhole.save()
      }

      return manhole
    } catch (e) {
      console.log(e)
      throw e
    }

  }
}

module.exports = new ManholeRepository

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

      if (manhole.adopted && user._id.equals(manhole.user_id)) {
        console.log('removendo')
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
    return Manhole.find({ adopted: true }).exec()
  }
}

module.exports = new ManholeRepository

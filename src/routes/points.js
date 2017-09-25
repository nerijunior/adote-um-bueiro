const Manhole = require('../schemas/Manhole')

module.exports = function (req, res) {
  const lat = req.body.lat
  const lng = req.body.lng

  const limit = req.query.limit || 100;
  let maxDistance = req.query.distance || 1000;

  maxDistance /= 6371

  const coordinates = [lat, lng]

  const query = {
    location: {
      $near: coordinates,
      $maxDistance: maxDistance
    }
  }

  Manhole.find(query).limit(limit).exec((err, manholes) => {
    if (err) throw err

    res.send({manholes})
  })
}

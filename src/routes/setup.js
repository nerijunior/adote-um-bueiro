const Manhole = require('../schemas/Manhole')
const casual = require('casual')

module.exports = function (req, res) {
  const lat = req.params.lat
  const lng = req.param.lng

  function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }

  for (let i = 0; i <= 100; i++) {
    const m = new Manhole()
    m.name = casual.company_name
    m.location = [getRandom(-25.42, -25.45), getRandom(-49.045, -49.089)]
    m.adopted = (getRandom(-1,1) > 0)
    m.save()
  }

  res.send(req.params)
}

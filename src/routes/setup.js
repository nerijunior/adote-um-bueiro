const Manhole = require('../schemas/Manhole')
const casual = require('casual')

module.exports = function (req, res) {
  const lat = req.params.lat
  const lng = req.param.lng

  function getRandom(min, max) {
    return Math.random() * (max - min) + min
  }

  const howMuch = 100

  for (let i = 0; i <= howMuch; i++) {
    const m = new Manhole()
    m.name = casual.company_name
    // Piraquara
    // m.location = [getRandom(-25.42, -25.45), getRandom(-49.045, -49.089)]

    // Curitiba
    // m.location = [getRandom(-25.405910898357273,-25.46435441548541), getRandom(-49.22046661376953,-49.305782318115234)]
    // m.location = [getRandom(-25.383890343283284,-25.556535108103557), getRandom(-49.34680938720703,-49.14905548095703)]
    m.adopted = false
    m.save()
  }

  res.send(req.params)
}

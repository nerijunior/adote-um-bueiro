const path = require('path')
require('dotenv').config({ path: path.dirname(__dirname) + '/.env' })

const moment = require('moment')
const db = require('./core/db')
const Manhole = require('./schemas/Manhole')
const mailgun = require('mailgun.js')
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_KEY,
})

const ManholeRepository = require('./repositories/ManholeRepository')

const DAYS_INTERVAL = process.env.MAIL_ALERT_INTERVAL || 30

function sendAlert(manhole) {
  const data = {
    from: 'Neri Junior <neri@nerijunior.com>',
    to: 'neri@nerijunior.com',
    subject: 'Teste',
    text: 'Testando NODE JS',
    html: '<h1>Teste HTML</h1>'
  }

  return mg.messages.create(process.env.MAILGUN_DOMAIN, data)
}

function saveAllAlerts(alerts) {
  Promise.all(alerts)
      .then(ids => {

        ids.map((id) => {
          Manhole.findById(id, function(err, manhole){
            if (err) throw err

            console.log('manhole:', manhole)
          })
        })
      })
      .catch(error => {
        console.error(error)
      })
      .then(() => {
        process.exit()
      })
}

ManholeRepository.getAdopted()
  .then(manholes => {

    alerts = []

    manholes.map((manhole) => {
      // Check the last alert sent
      let now = moment()
      let fewDaysAgo = moment().subtract(DAYS_INTERVAL, 'day')

      if (manhole.last_alert) {
        let lastAlert = moment(manhole.last_alert)

        if (lastAlert >= tenDaysAgo) {
          return
        }
      }

      const promise = sendAlert(manhole)
        .then(() => {
          return manhole._id
        })

      alerts.push(promise)
    })

    saveAllAlerts(alerts)
  })

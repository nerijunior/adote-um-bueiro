const path = require('path')
const moment = require('moment')
const pug = require('pug')

require('dotenv').config({ path: path.dirname(__dirname) + '/.env' })

const db = require('./core/db')
const mailgun = require('mailgun.js')
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_KEY,
})

const Manhole = require('./schemas/Manhole')
const ManholeRepository = require('./repositories/ManholeRepository')
const DAYS_INTERVAL = process.env.MAIL_ALERT_INTERVAL || 30


function sendAlert(manhole) {
  let template = pug.compileFile(__dirname + '/emails/alert.pug')
  const data = {
    from: 'Não responder <nao-responder@adote-um-bueiro.herokuapps.com>',
    to: manhole.user.email,
    subject: `${manhole.name} precisa do seu cuidado!`,
    html: template({
      manhole,
      days: DAYS_INTERVAL
    })
  }

  return mg.messages.create(process.env.MAILGUN_DOMAIN, data)
}

function saveAllAlerts(alerts) {
  Promise.all(alerts)
      .then(ids => {
        Manhole.update({ _id: { $in : ids } }, { $set: { last_alert: new Date } }, (err, result) => {
          if (err) throw err
          console.log(result)
          process.exit()
        })
      })
      .catch(error => {
        console.error(error)
      })
}

ManholeRepository.getAdopted()
  .then(manholes => {

    let alerts = []

    manholes.map((manhole) => {
      // Check the last alert sent

      let fewDaysAgo = moment().subtract(DAYS_INTERVAL, 'day')

      if (manhole.last_alert) {
        let lastAlert = moment(manhole.last_alert)

        if (lastAlert <= fewDaysAgo) {
          return console.log(manhole._id, 'rejected')
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

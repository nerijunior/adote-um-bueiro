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

/**
 * Send an email to user that adopted the manhole
 * @param  Manhole manhole Manhole Schema
 * @return Promise
 */
function sendEmail(manhole) {
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

/**
 * Update Manholes after the email to avoid email duplicates
 * @param  Array of Promises alerts
 * @return void
 */
function updateManholes(emails) {
  Promise.all(emails)
      .then(ids => {
        Manhole.update({ _id: { $in : ids } }, { $set: { last_alert: new Date } }, { multi: true }, (err, result) => {
          if (err) throw err
          console.log(result)
          process.exit()
        })
      })
      .catch(error => {
        console.error(error)
        process.exit()
      })
}

return false;

// Select every adopted manhole
ManholeRepository.getAdopted()
  .then(manholes => {

    let emails = []

    manholes.map((manhole) => {
      const createdAt = moment(manhole.created_at)
      const fewDaysAgo = moment().subtract(DAYS_INTERVAL, 'day')

      // Check if the manholes was created recently
      if (createdAt > fewDaysAgo) {
        return console.log(manhole._id, 'rejected - created_at')
      }

      // Check the last alert sent
      if (manhole.last_alert) {
        let lastAlert = moment(manhole.last_alert)

        if (lastAlert <= fewDaysAgo) {
          return console.log(manhole._id, 'rejected - last_alert')
        }
      }

      // Create the promise
      const promise = sendEmail(manhole)
        .then(() => {
          return manhole._id
        })

      emails.push(promise)
    })

    updateManholes(emails)
  })

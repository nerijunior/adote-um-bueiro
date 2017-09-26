# 🕳 Adopt a Manhole

Adopt a Manhole is a project to involve the community to take care of city's manholes

## Running

```
yarn
cd public && yarn && yarn build
node server.js
```

## Send alerts

Alerts are sent every 30 days after the adoption of a manhole, you can change the param `MAIL_ALERT_INTERVAL` at `.env` file.

`node src/cron.js`

module.exports = {
  env: process.env.NODE_ENV,
  secret: process.env.APP_SECRET,
  db: {
    uri: process.env.MONGODB_URI
  }
}

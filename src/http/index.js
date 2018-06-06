const express = require('express')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const messageRoute = require('./routes/messages')
const router = new express.Router()

module.exports = (services, repositories, io) => {
  const auth = authRoute.create(services)
  const user = userRoute.create(services, repositories)
  const message = messageRoute.create(services, repositories, io)
  router.use('', auth)
  router.use('/user', user)
  router.use('/message', message)

  router.get('/status', (req, res) => {
    res.json({ status: 'OK' })
  })

  return router
}

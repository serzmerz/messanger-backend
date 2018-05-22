const express = require('express')
const passport = require('../../middlewares/auth')
const {generator} = require('../../middlewares/jwt')
const router = new express.Router()
const authenticate = require('../../middlewares/authenticate')

function create ({ authService }) {
  router.safe('post', '/signup', async (req, res) => {
    await authService.signUp(req.body)
    res.json({ success: true })
  })

  router.post('/login',
    passport.initialize(),
    authenticate,
    (req, res) => {
      const { id, username, image } = req.user
      res.json({
        token: generator(req.user),
        instance: { id, username, image }
      })
    }
  )

  router.safe('get', '/me', async (req, res) => {
    const user = await authService.getUser(req.user.id)
    res.json({ user })
  })

  router.safe('put', '/auth/:id', async (req, res) => {
    const { user } = req
    const formData = req.body
    const instance = await authService.updateUserProfile(req.files, user, formData)
    res.json({ instance })
  })

  return router
}

module.exports.create = create

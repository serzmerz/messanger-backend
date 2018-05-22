const express = require('express')
const router = new express.Router()
const { upload } = require('../../libs/multer')

function create (_, { userRepository }) {
  router.safe('get', '/groups', async (req, res) => {
    const userGroups = await userRepository.getUserGroups(req.user.id)
    res.json(userGroups)
  })

  router.safe('get', '/group/:id', async (req, res) => {
    const userGroup = await userRepository.getUserGroup(req.params.id)
    res.json(userGroup)
  })

  router.safe('put', '/group/:id', upload.single('icon'), async (req, res) => {
    const result = await userRepository.updateGroup(req.params.id, req.body, req.file)
    res.json(result)
  })

  router.safe('post', '/group/:id/leave', async (req, res) => {
    const result = await userRepository.leaveGroup(req.params.id, req.user.id)
    res.json(result)
  })

  router.safe('delete', '/group/:id', async (req, res) => {
    const result = await userRepository.removeGroup(req.params.id, req.user.id)
    res.json(result)
  })

  router.safe('get', '/friends', async (req, res) => {
    const userFriends = await userRepository.getUserFriends(req.user.id)
    res.json(userFriends)
  })

  router.safe('get', '/users', async (req, res) => {
    let result = []
    if (req.query.search.length > 3) {
      result = await userRepository.findAllUsers(req.query)
    }
    res.json(result)
  })

  router.safe('post', '/friends/:userId', async (req, res) => {
    const result = await userRepository.addFriend(req.user.id, req.params.userId)
    res.json(result)
  })

  router.safe('post', '/group', upload.single('icon'), async (req, res) => {
    const result = await userRepository.createGroup(req.user.id, req.body, req.file)
    res.json(result)
  })

  router.safe('put', '/', upload.single('avatar'), async (req, res) => {
    const user = await userRepository.updateUser(req.user.id, req.body, req.file)
    res.json(user)
  })

  return router
}

module.exports.create = create

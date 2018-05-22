const express = require('express')
const router = new express.Router()
const { upload } = require('../../libs/multer')

function create (_, { messageRepository }) {
  router.safe('get', '/group/:id', async (req, res) => {
    const messages = await messageRepository.getAll(req.params.id)
    res.json(messages)
  })

  router.safe('post', '/group/:id', upload.single('image'), async (req, res) => {
    console.log()
    const message = await messageRepository.add(req.user.id, req.params.id, req.body.text, req.file)
    res.json(message)
  })

  return router
}

module.exports.create = create

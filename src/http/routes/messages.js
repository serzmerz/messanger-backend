const express = require('express')
const router = new express.Router()
const { upload } = require('../../libs/multer')

let room = 1

function create (_, { messageRepository }, io) {
  io.on('connection', function (socket) {
    console.log('a user connected')
    socket.on('subscribe', data => {
      room = data.room
      socket.join(room)
      console.log('joined room', room)
    })

    socket.on('unsubscribe', () => {
      socket.leave(room)
      console.log('leaving room', room)
    })

    socket.on('disconnect', function () {
      console.log('user disconnected')
    })
    router.safe('get', '/group/:id', async (req, res) => {
      const messages = await messageRepository.getAll(req.params.id)
      res.json(messages)
    })

    router.safe('post', '/group/:id', upload.single('image'), async (req, res) => {
      const message = await messageRepository.add(req.user.id, req.params.id, req.body.text, req.file)
      io.to(req.params.id).emit('chat message', JSON.stringify(message))
      res.json(message)
    })
  })

  return router
}

module.exports.create = create

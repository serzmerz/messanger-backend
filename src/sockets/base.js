module.exports = function (io) {
  io.on('connection', function (socket) {
    console.log('connect')
    socket.emit('news', { hello: 'world' })
    socket.on('my other event', function (data) {
      console.log(data)
    })
  })
}

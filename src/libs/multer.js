const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, `user-${file.fieldname}-${req.user.id}-${Date.now()}.jpg`)
  }
})

exports.upload = multer({ storage })

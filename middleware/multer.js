const multer = require('multer')

const MIME_TYPES = {
  'image/jpeg': 'jpeg',
  'image/png': 'png',
  'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'file_uploads')
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, Date.now() + '.' + MIME_TYPES[file.mimetype])
  }
})

const upload = multer({ storage })

module.exports = upload

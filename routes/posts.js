const { Router } = require('express')
const postCtrl = require('../controllers/post.js')
const multer = require('../middleware/multer.js')
const routes = Router()

routes.get('/', postCtrl.getAll)
routes.get('/:id', postCtrl.getOne)
routes.post('/', multer.single('upload'), postCtrl.createOne)
routes.put('/:id', multer.single('upload'), postCtrl.useOne)
routes.delete('/:id', postCtrl.delOne)

module.exports = routes

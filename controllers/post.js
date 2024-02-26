// const { application } = require('express')
const { Post } = require('../models/index.js')

module.exports.getAll = function (req, res) {
  Post.findAll()
    .then((posts) => {
      res.status(200).json(posts)
    })
    .catch()
}

module.exports.getOne = function (req, res) {
  const id = req.params.id

  Post.findByPk(id)
    .then((post) => {
      res.status(200).json(post)
    })
    .catch()
}

module.exports.createOne = function (req, res) {
  Post.create({ title: req.body.title, text: req.body.text })
    .then(post => {
      res.status(201).json(post)
    })
    .catch(error => {
      console.log(error)
    })
}

module.exports.useOne = function (req, res) {
  const id = req.params.id

  Post.findByPk(id)
    .then((post) => {
      post.update({ title: req.body.title, text: req.body.text })
        .then(() => {
          res.status(200).json({ post: 'Hello world' })
        })
        .catch((error) => {
          res.status(500).json(error)
        })
    })

    .catch((error) => {
      res.status(500).json(error)
    })
}

module.exports.delOne = function (req, res, next) {
  const id = req.params.id
  Post.findByPk(id)
    .then((post) => {
      if (post == null) {
        return res.status(404).json({ message: 'Not found' })
      }
      post.destroy().then(() => {
        res.status(200).json({ delete: 'message deleted' })
      })
        .catch((error) => {
          res.status(500).json(error)
        })
    })
    .catch()
}

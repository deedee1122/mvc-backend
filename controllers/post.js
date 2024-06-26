// const { application } = require('express')
const { Post, Image } = require('../models/index.js')
/** This is getall
 * @param {Object} req
 *
 *
 *  */

module.exports.getAll = function (req, res) {
  Post.findAll()
    .then((posts) => {
      res.status(200).json(posts)
    })
    .catch((error) => {
      res.status(500).json(error)
    })
}

module.exports.getOne = function (req, res) {
  const id = req.params.id

  Post.findByPk(id)
    .then((post) => {
      res.status(200).json(post)
    })
    .catch((error) => {
      res.status(500).json(error)
    })
}
/**
 * This create a post
 * @param {Object} req
 * @param {Object} req.body
 * @param {string} req.body.title - title of the post
 * @param {string} req.body.text
 * @param {Object} req.file
 * @param {Object} req.file.filename
 * @param {number} req.file.size
 * @param {Object} req.json
 * @param {Object} res
 *
 */
module.exports.createOne = function (req, res) {
  const postData = {
    title: req.body.title,
    text: req.body.text
  }
  if (req.file) {
    postData.Images = [{
      filename: req.file.filename,
      filesize: req.file.size
    }]
  }
  Post.create(postData, {
    include: [Image]
  })

    .then(post => {
      res.status(201).json(post)
    })
    .catch(error => {
      console.log(error)
    })
}

/***
 * This is useone post
 * @param {Object} req
 * @param {Object} req.params
 * @param {string} req.params.id
 * @param {Object} req.body || {}
 * @param {Object} req.file
 * @param {string} req.file.filename
 * @param {number} req.file.size
 *
 */

module.exports.useOne = function (req, res) {
  const id = req.params.id
  const postData = req.body || {}

  if (req.file) {
    postData.Images = [{
      filename: req.file.filename,
      filesize: req.file.size
    }]
  }

  Post.findByPk(parseInt(id))
    .then((post) => {
      post.update(postData, {
        include: [Image]
      })
        .then((data) => {
          res.status(200).json(data)
        })
        .catch((error) => {
          res.status(500).json(error)
        })
    })

    .catch((error) => {
      res.status(500).json(error)
    })
}

/**
 *  @typedef {Object} delOne
 *  @param {Object} req
    @param {Object} req.params
    @param {string} req.params.id

 */

module.exports.delOne = function (req, res, next) {
  const id = req.params.id
  Post.findByPk(parseInt(id))
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
    .catch((error) => {
      res.status(500).json(error)
    })
}

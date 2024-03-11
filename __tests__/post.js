const postCtrl = require('../controllers/post.js')
const { Post } = require('../models/index.js')
const { describe, expect, test } = require('@jest/globals')
describe('getOne', () => {
  beforeEach(() => {
    Post.create({
      title: 'Post me here',
      text: 'Send the request'
    })
  })

  afterEach(() => {
    Post.drop()
  })
  const req = {
    params: {
      id: 1
    }
  }

  test('should get one post by pk', (done) => {
    const res = {
      status (num) {
        return res
      },
      json: (data) => {
        try {
          const instanceOfPost = data instanceof Post
          expect(instanceOfPost).toBe(true)
          done()
        } catch (error) {
          done(error)
        }
      }
    }

    postCtrl.getOne(req, res)
  })
})

describe('getAll', () => {
  const req = {
    params: {
      id: 2
    }
  }
  test('should get all post', (done) => {
    const res = {
      status (id) {
        return res
      },
      json: (data) => {
        for (const key in data.dataValues) {
          if (Object.hasOwnProperty.call(data.dataValues, key)) {
            const post = data.dataValues[key]
            const instanceOfPost = post instanceof Post
            expect(instanceOfPost).toBe(true)
          }
        }
        done()
      }

    }

    postCtrl.getAll(req, res)
  })
})

describe('createOne', () => {
  const req = {
    body: {
      title: 'Hello world1',
      text: ' Welcome'
    }
  }
  test('should createOne', (done) => {
    const res = {
      status (id) {
        return res
      },
      json: (data) => {
        const instanceOfPost = data instanceof Post
        expect(instanceOfPost).toBe(true)

        done()
      }

    }

    postCtrl.createOne(req, res)
  })
})

describe('should useOne post', () => {
  const req = {
    params: {
      id: 3
    }
  }
  test('should useOne post', (done) => {
    const res = {
      status (id) {
        return res
      },
      json: (data) => {
        const instanceOfPost = data instanceof Post
        expect(instanceOfPost).toBe(true)

        done()
      }

    }

    postCtrl.useOne(req, res)
  })
})

const postCtrl = require('../controllers/post.js')
const { Post } = require('../models/index.js')
const { describe, expect, test, beforeEach, afterEach } = require('@jest/globals')
describe('getOne', () => {
  beforeEach(() => {
    return Post.create({
      title: 'Post me here',
      text: 'Send the request'
    })
  })

  afterEach(() => {
    return Post.sync({ force: true })
  })
  test('should get one post by pk', (done) => {
    const req = {
      params: {
        id: 1
      }
    }

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
  beforeEach(() => {
    return Post.bulkCreate([{
      title: 'Welcome to France',
      text: 'Okay'
    }, {
      title: 'We are here coding',
      text: 'live'
    }])
  })

  afterEach(() => {
    return Post.sync({ force: true })
  })
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
  beforeEach(() => {
    return Post.create({
      title: 'Germany',
      text: 'Send Location'
    })
  })

  afterEach(() => {
    return Post.sync({ force: true })
  })

  const req = {
    body: {
      title: 'United Kingdom',
      text: ' England'

    },
    params: {
      id: 1
    }
  }

  test('should useOne post', (done) => {
    const res = {
      status (id) {
        return res
      },
      json: (data) => {
        console.log(data)
        const instanceOfPost = data instanceof Post
        expect(instanceOfPost).toBe(true)
        expect(data.title).toBe('United Kingdom')
        done()
      }

    }
    postCtrl.useOne(req, res)
  })
})

describe('should delOne delete post', () => {
  beforeEach(() => {
    return Post.create({
      title: 'Delete one by one',
      text: 'delete all'
    })
  })
  afterEach(() => {
    return Post.sync({ force: true })
  })

  test('should delOne delete post', (done) => {
    const req = {
      params: {
        id: 1
      }
    }

    const res = {
      status (id) {
        return res
      },
      json: (data) => {
        expect(data).toEqual({ delete: 'message deleted' })

        done()
      }

    }

    postCtrl.delOne(req, res)
  })
})

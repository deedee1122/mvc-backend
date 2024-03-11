const express = require('express')
const postRoutes = require('./routes/posts.js')
require('@dotenvx/dotenvx').config()
const app = express()
app.use(express.json())
app.use('/api/v1/post', postRoutes)

const port = 3000
app.listen(port, () => {
  console.log(`Server started on ${port}`)
})

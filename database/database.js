const { Sequelize } = require('sequelize')
// const Post = require('../models/Post')
// const { text } = require('express')
const sequelize = new Sequelize({
  dialect: 'sqlite',
  // storage: '../database.sqlite'
  storage: './database.sqlite'
})

sequelize.sync()
console.log('All models were synchronized successfully.')

// const sequel = async () => {
//   await sequelize.sync()
//   const jane = await Post.create({
//     title: 'janedoe',
//     text: new Date(1980, 6, 20)
//   })
//   console.log(jane.toJSON())
// }
module.exports = sequelize

// const { Sequelize, DataTypes } = require('sequelize')
// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: './database.sqlite'
// })

// const Post = sequelize.define('Post', {
//   title: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   text: {
//     type: DataTypes.STRING,
//     allowNull: false
//   }
// }
// )

// Post.sync({ force: true }).then((data) => {
//   console.log(data)
// })

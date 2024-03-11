const { Sequelize } = require('sequelize')
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DATABASE
})

sequelize.sync()
console.log('All models were synchronized successfully.')

module.exports = sequelize

const { Sequelize } = require('sequelize')
let logging = console.log
if (process.env.LOGGING === 'false') {
  logging = () => {

  }
}
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DATABASE,
  logging
})

sequelize.sync()
console.log('All models were synchronized successfully.')

module.exports = sequelize

const Sequelize = require('sequelize')

const sequel = new Sequelize('practice', 'root', 'Password123#@!', {
    'host':'localhost',
    'dialect':'mysql'
})
module.exports = sequel;
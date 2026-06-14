const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('project', 'postgres', 'd131006m', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false
})

module.exports = sequelize

const { DataTypes } = require('sequelize')
const sequelize = require('../config')

const Student = sequelize.define('Student', {
	full_name: { type: DataTypes.STRING, allowNull: false }
})

module.exports = Student

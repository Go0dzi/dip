const { DataTypes } = require('sequelize')
const sequelize = require('../config')

const Attendance = sequelize.define('Attendance', {
	date: { type: DataTypes.DATEONLY, allowNull: false },
	present: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
	reason: {
		type: DataTypes.ENUM(
			'Болел',
			'Семейные обстоятельства',
			'По уважительной причине',
			'Без уважительной причины',
			'Другое'
		),
		allowNull: true,
		defaultValue: 'Без уважительной причины'
	}
})

module.exports = Attendance

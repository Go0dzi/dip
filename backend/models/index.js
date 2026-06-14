const sequelize = require('../config')

const Student = require('./Student')
const Group = require('./Group')
const Attendance = require('./Attendance')
const Admin = require('./Admin')

Student.belongsTo(Group, { foreignKey: 'groupId' })
Group.hasMany(Student, { foreignKey: 'groupId' })

Attendance.belongsTo(Student, { foreignKey: 'studentId' })
Student.hasMany(Attendance, { foreignKey: 'studentId' })

module.exports = {
	sequelize,
	Admin,
	Student,
	Group,
	Attendance
}

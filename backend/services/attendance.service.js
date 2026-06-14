const { Op } = require('sequelize')
const { Attendance, Student } = require('../models')

async function getStudentsMonthly() {
	const today = new Date()
	const lastMonth = new Date()
	lastMonth.setDate(today.getDate() - 29)

	const attendances = await Attendance.findAll({
		where: {
			date: {
				[Op.between]: [
					lastMonth.toISOString().slice(0, 10),
					today.toISOString().slice(0, 10)
				]
			}
		},
		include: [
			{
				model: Student,
				attributes: ['id', 'full_name', 'groupId']
			}
		],
		order: [['date', 'ASC']]
	})

	const groupedByDate = attendances.reduce((acc, att) => {
		const date = att.date
		if (!acc[date]) acc[date] = []
		acc[date].push(att)
		return acc
	}, {})

	return groupedByDate
}

const createDailyAttendance = async date => {
	const students = await Student.findAll()

	for (const student of students) {
		const existing = await Attendance.findOne({
			where: { studentId: student.id, date }
		})

		if (!existing) {
			await Attendance.create({
				studentId: student.id,
				date,
				present: true,
				reason: null
			})
		}
	}
}

module.exports = { getStudentsMonthly, createDailyAttendance }

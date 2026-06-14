const Student = require('../models/Student')
const Attendance = require('../models/Attendance')
const { getStudentsMonthly } = require('../services/attendance.service')

const getAllAttendance = async (req, res) => {
	try {
		const attendance = await Attendance.findAll()
		res.json(attendance)
	} catch (err) {
		console.error(err)
		res.status(500).json({ error: 'Ошибка сервера' })
	}
}

const AssignToStudentAttendance = async (req, res) => {
	try {
		const { studentId } = req.params
		const { date, present, reason } = req.body

		const student = await Student.findByPk(studentId)
		if (!student) {
			return res.status(404).json({ message: 'Такого студента не существует' })
		}

		const existingAttendance = await Attendance.findOne({
			where: {
				studentId: student.id,
				date
			}
		})

		if (existingAttendance) {
			existingAttendance.present = present
			existingAttendance.reason = present
				? null
				: reason || 'Без уважительной причины'

			await existingAttendance.save()

			return res.json({
				message: 'Посещаемость обновлена',
				attendance: existingAttendance
			})
		}

		const attendance = await Attendance.create({
			date,
			present,
			reason: present ? null : reason || 'Без уважительной причины',
			studentId: student.id
		})

		res.json({
			message: 'Посещаемость добавлена',
			attendance
		})
	} catch (err) {
		console.error(err)
		res.status(500).json({ error: 'Ошибка сервера' })
	}
}

const getMonthlyStats = async (req, res) => {
	try {
		const date = await getStudentsMonthly()
		res.json(date)
	} catch (err) {
		console.error(err)
		res.status(500).json({ error: 'Ошибка сервера' })
	}
}

module.exports = {
	getAllAttendance,
	AssignToStudentAttendance,
	getMonthlyStats
}

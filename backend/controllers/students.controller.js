const Student = require('../models/Student')
const Group = require('../models/Group')
const Attendance = require('../models/Attendance')
const XLSX = require('xlsx')
const fs = require('fs')
const path = require('path')

const getAllStudents = async (req, res) => {
	try {
		const students = await Student.findAll({
			include: [{ model: Group }, { model: Attendance }]
		})

		res.json(students)
	} catch (err) {
		console.error(err)
		res.status(500).json({ error: 'Ошибка сервера' })
	}
}

const getStudentById = async (req, res) => {
	try {
		const { id } = req.params
		const student = await Student.findByPk(id)

		res.json(student)
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Ошибка сервера' })
	}
}

const deleteStudent = async (req, res) => {
	try {
		const { id } = req.params
		const student = await Student.findByPk(id)
		if (!student)
			return res.status(404).json({ message: 'Такого студента не существует' })

		student.destroy()
		res.json({ message: 'Студент удален' })
	} catch (err) {
		console.error(err)
		res.status(500).json({ error: 'Ошибка сервера' })
	}
}

const uploadFileStudents = async (req, res) => {
	try {
		if (!req.file)
			return res.status(404).json({ message: 'Файла не существует' })

		const workbook = XLSX.readFile(req.file.path)
		const sheetName = workbook.SheetNames[0]
		const sheet = workbook.Sheets[sheetName]
		const data = XLSX.utils.sheet_to_json(sheet)

		for (const row of data) {
			let group = await Group.findOne({ where: { name: row.group_name } })
			if (!group) {
				group = await Group.create({ name: row.group_name })
			}

			await Student.create({
				full_name: row.full_name,
				groupId: group.id
			})
		}
		res.json({ message: 'Студенты успешно загружены' })
	} catch (err) {
		console.error(err)
		res.status(500).json({ error: 'Ошибка сервера' })
	}
}

const exportStudentsWithAttendance = async (req, res) => {
	try {
		const students = await Student.findAll({
			include: [{ model: Group }, { model: Attendance }]
		})

		const data = students.map(s => ({
			ФИО: s.full_name,
			Группа: s.Group?.name || '',
			Пропуски: s.Attendances?.filter(a => a.present === false).length || 0
		}))

		const wb = XLSX.utils.book_new()
		const ws = XLSX.utils.json_to_sheet(data)
		XLSX.utils.book_append_sheet(wb, ws, 'Студенты')

		const fileName = 'Students.xlsx'
		XLSX.writeFile(wb, fileName)

		res.download(fileName)
	} catch (err) {
		console.error(err)
		res.status(500).json({ error: 'Ошибка при экспорте' })
	}
}

module.exports = {
	getAllStudents,
	getStudentById,
	deleteStudent,
	exportStudentsWithAttendance,
	uploadFileStudents
}

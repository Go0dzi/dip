const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const {
	getAllStudents,
	deleteStudent,
	getStudentById
} = require('../controllers/students.controller')

router.get('/', getAllStudents)
router.get('/:id', getStudentById)
router.delete('/:id', deleteStudent)

module.exports = router

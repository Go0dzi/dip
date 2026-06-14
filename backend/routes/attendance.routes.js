const express = require('express')
const router = express.Router()
const {
	AssignToStudentAttendance,
	getAllAttendance,
	getMonthlyStats
} = require('../controllers/attendance.controller')

router.get('/', getAllAttendance)
router.post('/:studentId', AssignToStudentAttendance)
router.get('/monthly', getMonthlyStats)

module.exports = router

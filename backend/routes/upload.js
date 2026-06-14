const express = require('express')
const router = express.Router()
const multer = require('multer')
const {
	uploadFileStudents,
	exportStudentsWithAttendance
} = require('../controllers/students.controller')
const upload = multer({ dest: 'uploads/' })

router.post('/import', upload.single('file'), uploadFileStudents)
router.get('/export', exportStudentsWithAttendance)

module.exports = router

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()

const studentsRoutes = require('./routes/students.routes')
const groupsRoutes = require('./routes/groups.routes')
const uploadRoutes = require('./routes/upload')
const attendanceRoutes = require('./routes/attendance.routes')
const adminRoutes = require('./routes/admin.routes')

app.use(express.json())
app.use(cookieParser())
app.use(
	cors({
		origin: 'http://localhost:5173',
		credentials: true
	})
)

app.use('/api/admin', adminRoutes)
app.use('/api/students', studentsRoutes)
app.use('/api/attendance', attendanceRoutes)
app.use('/api/groups', groupsRoutes)
app.use('/api/upload', uploadRoutes)

module.exports = app

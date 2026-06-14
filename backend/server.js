const app = require('./app')
const cron = require('node-cron')
const { sequelize } = require('./models')
const { createDailyAttendance } = require('./services/attendance.service')
const PORT = 3000

;(async () => {
	try {
		await sequelize.authenticate()
		console.log('База данных работает')

		// await sequelize.sync({ force: true })
		await sequelize.sync()
		console.log('Синхронизация прошла успешно')

		app.listen(PORT, () => {
			console.log(`Сервер запущен на порту ${PORT}`)
		})

		const today = new Date().toISOString().split('T')[0]
		console.log('Проверяем и создаём посещаемость на сегодня:', today)
		await createDailyAttendance(today)

		cron.schedule('1 0 * * *', async () => {
			const day = new Date().toISOString().split('T')[0]
			console.log('Создаём ежедневную посещаемость:', day)
			await createDailyAttendance(day)
		})
	} catch (err) {
		console.error('Ошибка запуска: ', err)
	}
})()

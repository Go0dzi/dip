const sequelize = require('./config')
const Admin = require('./models/Admin')

const createFirstAdmin = async () => {
	try {
		await sequelize.authenticate()

		const existingAdmin = await Admin.findOne({ where: { username: 'admin' } })
		if (existingAdmin) {
			console.log('Администратор с логином "admin" уже существует!')
			return
		}

		await Admin.create({
			username: 'admin',
			password: '1234'
		})

		console.log('Администратор успешно добавлен в базу данных!')
	} catch (err) {
		console.error('Ошибка при создании администратора:', err)
	} finally {
		await sequelize.close()
	}
}

createFirstAdmin()

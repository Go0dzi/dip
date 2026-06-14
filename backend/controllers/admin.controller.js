const Admin = require('../models/Admin')
const jwt = require('jsonwebtoken')
const sequelize = require('../config')

const JWT_SECRET = 'super_secret_key_999'

const isAuth = async (req, res) => {
	try {
		const token = req.cookies.auth_token
		if (!token) {
			return res.status(200).json({ isAuth: false })
		}

		const decoded = jwt.verify(token, JWT_SECRET)

		const admin = await Admin.findByPk(decoded.id)
		if (!admin) {
			return res.status(200).json({ isAuth: false })
		}
		return res.status(200).json({ isAuth: true, username: admin.username })
	} catch (err) {
		return res.status(200).json({ isAuth: false })
	}
}

const login = async (req, res) => {
	try {
		const { username, password } = req.body
		if (!username || !password) {
			return res.status(400).json({ error: 'Введите логин и пароль' })
		}

		const admin = await Admin.findOne({
			where: { username: username }
		})
		if (!admin) {
			return res.status(401).json({ error: 'Неверный логин или пароль' })
		}
		if (admin.password !== password) {
			return res.status(401).json({ error: 'Неверный логин или пароль' })
		}
		const token = jwt.sign({ id: admin.id }, JWT_SECRET, { expiresIn: '24h' })

		res.cookie('auth_token', token, {
			httpOnly: true,
			secure: false,
			sameSite: 'lax',
			maxAge: 24 * 60 * 60 * 1000
		})

		return res.status(200).json({
			message: 'Успешный вход',
			user: {
				id: admin.id,
				username: admin.username
			}
		})
	} catch (err) {
		console.error(err)
		res.status(500).json({ error: 'Ошибка сервера' })
	}
}

const logout = async (req, res) => {
	res.clearCookie('auth_token')
	return res.status(200).json({ message: 'Успешный выход' })
}

const deleteDataBase = async (req, res) => {
	try {
		await sequelize.truncate({ cascade: true, restartIdentity: true })
		return res.status(200).json({ message: 'Все данные успешно удалены' })
	} catch (err) {
		console.error(err)
		res.status(500).json({ error: 'Ошибка сервера' })
	}
}

module.exports = {
	login,
	isAuth,
	logout,
	deleteDataBase
}

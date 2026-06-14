const express = require('express')
const router = express.Router()
const {
	login,
	isAuth,
	logout,
	deleteDataBase
} = require('../controllers/admin.controller')

router.post('/login', login)
router.get('/is-auth', isAuth)
router.post('/logout', logout)
router.delete('/delete-data-base', deleteDataBase)

module.exports = router

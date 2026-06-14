const express = require('express')
const router = express.Router()
const {
	getAllGroups,
	deleteGroup,
	updateGroup
} = require('../controllers/groups.controller')

router.get('/', getAllGroups)
router.delete('/:id', deleteGroup)
router.patch('/:id', updateGroup)

module.exports = router

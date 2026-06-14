const Group = require('../models/Group')

const getAllGroups = async (req, res) => {
	try {
		const groups = await Group.findAll()
		res.json(groups)
	} catch (err) {
		console.log(err)
		res.status(500).json({ error: 'Ошибка сервера' })
	}
}

const updateGroup = async (req, res) => {
	try {
		const { id } = req.params
		const [updatedGroup] = await Group.update(req.body, { where: { id } })

		if (!updatedGroup)
			return res.status(404).json({ message: 'Такой группы не существует' })
		res.json(updatedGroup)
	} catch (err) {
		console.error(err)
		res.status(500).json({ error: 'Ошибка сервера' })
	}
}

const deleteGroup = async (req, res) => {
	try {
		const { id } = req.params
		const group = await Group.findByPk(id)
		if (!group)
			return res.status(404).json({ message: 'Такой группы не существует' })
		group.destroy()
		res.json({ message: 'Группа удалена' })
	} catch (err) {
		console.error(err)
	}
}

module.exports = { getAllGroups, deleteGroup, updateGroup }

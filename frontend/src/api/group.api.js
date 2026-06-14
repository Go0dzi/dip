import httpClient from './index'

export const getAllGroups = async () => {
	const res = await httpClient.get('/api/groups')
	return res.data
}

export const updateGroup = async (id, data) => {
	const res = await httpClient.patch(`/api/groups/${id}`, data)
	return res.data
}

export const deleteGroup = async id => {
	const res = await httpClient.delete(`/api/groups/${id}`)
	return res.data
}

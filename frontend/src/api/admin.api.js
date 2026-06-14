import httpClient from './index'

export const loginRequest = async credentials => {
	const res = await httpClient.post('/api/admin/login', credentials)
	return res.data
}

export const checkAuthRequest = async () => {
	const res = await httpClient.get('/api/admin/is-auth')
	return res.data
}

export const deleteDataBase = async () => {
	const res = await httpClient.delete('/api/admin/delete-data-base')
	return res.data
}

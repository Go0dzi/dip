import httpClient from './index'

export const getAllStudents = async () => {
	const res = await httpClient.get('/api/students')
	return res.data
}

export const getStudentById = async id => {
	const res = await httpClient.get(`/api/students/${id}`)
	return res.data
}

export const deleteStudent = async id => {
	const res = await httpClient.delete(`/api/students/${id}`)
	return res.data
}

export const exportStudentsWithAttendance = async () => {
	const res = httpClient.get('/api/students/export')
	return res.data
}

export const uploadFileStudents = async data => {
	const res = await httpClient.post('/api/upload/import', data, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
	return res.data
}

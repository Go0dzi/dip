import httpClient from './index'

export const getMonthlyStats = async () => {
	const res = await httpClient.get('/api/attendance/monthly')
	return res.data
}

export const AssignToStudentAttendance = async (id, data) => {
	const res = await httpClient.post(`/api/attendance/${id}`, data)
	return res.data
}

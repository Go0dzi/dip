import axios from 'axios'

const API_URL = 'http://localhost:3000'

const httpClient = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
})

export default httpClient

export * from './admin.api'
export * from './attendance.api'
export * from './group.api'
export * from './student.api'

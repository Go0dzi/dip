import { createContext, useEffect, useState } from 'react'
import { checkAuthRequest } from '../api/admin.api'

/* eslint-disable react-refresh/only-export-components */
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [isAuth, setIsAuth] = useState(false)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const initAuth = async () => {
			try {
				const data = await checkAuthRequest()

				if (data.isAuth) {
					setIsAuth(true)
				} else {
					setIsAuth(false)
				}
			} catch (err) {
				console.error('Пользователь не авторизован или ошибка сервера', err)
				setIsAuth(false)
			} finally {
				setIsLoading(false)
			}
		}

		initAuth()
	}, [])

	const login = () => setIsAuth(true)
	const logout = () => setIsAuth(false)

	return (
		<AuthContext.Provider value={{ isAuth, isLoading, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

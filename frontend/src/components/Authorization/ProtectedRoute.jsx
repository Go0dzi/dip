import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const ProtectedRoute = ({ children }) => {
	const { isAuth, isLoading } = useContext(AuthContext)

	if (isLoading) {
		return (
			<div className='flex items-center justify-center min-h-screen bg-slate-100'>
				<div className='text-slate-500 font-medium'>Загрузка...</div>
			</div>
		)
	}

	if (!isAuth) {
		return (
			<Navigate
				to='/login'
				replace
			/>
		)
	}

	return children
}

export default ProtectedRoute

import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginRequest } from '../../api/admin.api'
import { AuthContext } from '../../context/AuthContext'

const Login = () => {
	const { login } = useContext(AuthContext)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const navigate = useNavigate()

	const handleLogin = async e => {
		e.preventDefault()
		setError('')

		if (username === '' || password === '') {
			setError('Введите логин и пароль')
			return
		}

		try {
			const data = await loginRequest({ username, password })
			login()
			navigate('/')
		} catch (err) {
			setError(err.response?.data?.error || 'Произошла ошибка при входе')
		}
	}

	return (
		<div className='flex items-center justify-center min-h-screen bg-slate-100 p-4'>
			<div className='bg-white rounded-2xl shadow-lg w-full max-w-md p-8 flex flex-col gap-6'>
				<h1 className='text-2xl font-semibold text-slate-700 text-center'>
					Вход в систему
				</h1>

				<form
					onSubmit={handleLogin}
					className='flex flex-col gap-4'
				>
					<div className='flex items-center border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 focus-within:ring-2 focus-within:ring-blue-400'>
						<input
							type='text'
							placeholder='Логин'
							className='bg-transparent outline-none w-full text-slate-700 placeholder-slate-400'
							value={username}
							onChange={e => setUsername(e.target.value)}
						/>
					</div>

					<div className='flex items-center border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 focus-within:ring-2 focus-within:ring-blue-400'>
						<input
							type='password'
							placeholder='Пароль'
							className='bg-transparent outline-none w-full text-slate-700 placeholder-slate-400'
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
					</div>

					<button
						type='submit'
						className='bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition mt-2'
					>
						Войти
					</button>
				</form>

				{error && (
					<div className='text-sm text-red-700 bg-red-100 border border-red-300 rounded-xl p-3 text-center'>
						{error}
					</div>
				)}
			</div>
		</div>
	)
}

export default Login

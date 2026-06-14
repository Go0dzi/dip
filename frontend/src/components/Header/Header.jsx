import { useContext } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { AuthContext } from '../../context/AuthContext'

const Header = ({ nameList }) => {
	const { logout } = useContext(AuthContext)

	return (
		<header className='flex justify-between items-center px-6 py-4 bg-blue-600 text-white shadow'>
			<h1>{nameList}</h1>

			<div className='flex items-center gap-10'>
				<div className='flex gap-3 items-center'>
					<FaUserCircle size={32} />
					<span>admin</span>
				</div>

				<button
					className='px-5 py-1.5 bg-blue-500 hover:bg-blue-700 border border-blue-400 rounded-md transition cursor-pointer'
					onClick={() => logout()}
				>
					Выход
				</button>
			</div>
		</header>
	)
}

export default Header

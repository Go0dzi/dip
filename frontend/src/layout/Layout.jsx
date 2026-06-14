import { Outlet } from 'react-router-dom'
import Nav from '../components/layout/Nav'

const Layout = () => {
	return (
		<div className='flex min-h-screen'>
			<Nav />
			<div className='flex-1 bg-gray-100'>
				<Outlet />
			</div>
		</div>
	)
}

export default Layout

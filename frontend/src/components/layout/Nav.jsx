import {
	LuClipboardCheck,
	LuGraduationCap,
	LuLayoutDashboard,
	LuSchool,
	LuUsers
} from 'react-icons/lu'
import { NavLink } from 'react-router-dom'

const Nav = () => {
	const listSideBar = [
		{ name: 'Главная', link: '/', icon: LuLayoutDashboard },
		{ name: 'Посещаемость', link: '/attendances', icon: LuClipboardCheck },
		{ name: 'Студенты', link: '/students', icon: LuGraduationCap },
		{ name: 'Группы', link: '/groups', icon: LuUsers }
	]

	return (
		<div className='flex flex-col w-72 bg-slate-50 border-r border-slate-200 min-h-screen'>
			<div className='flex items-center gap-3 px-6 py-5 border-b border-slate-200'>
				<div className='flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600 text-white'>
					<LuSchool size={20} />
				</div>

				<div className='leading-tight'>
					<p className='font-semibold text-slate-800 text-sm'>Система учета</p>
					<p className='text-xs text-slate-500'>посещаемости студентов</p>
				</div>
			</div>

			<nav className='flex flex-col gap-1 p-4'>
				{listSideBar.map(item => {
					const Icon = item.icon

					return (
						<NavLink
							key={item.name}
							to={item.link}
							className={({ isActive }) =>
								`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition
								${isActive ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-200'}`
							}
						>
							<Icon size={20} />
							{item.name}
						</NavLink>
					)
				})}
			</nav>
		</div>
	)
}

export default Nav

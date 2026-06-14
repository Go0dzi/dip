import { useEffect, useState } from 'react'
import { deleteGroup, getAllGroups } from '../api/group.api'
import { getAllStudents } from '../api/student.api'
import Header from '../components/Header/Header'
import Paginated from '../components/other/Pagination'
import SearchFilter from '../components/other/SearchFilter'

const Groups = () => {
	const [groups, setGroups] = useState([])
	const [students, setStudents] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const group = await getAllGroups()
				const student = await getAllStudents()
				setStudents(student)
				setGroups(group)
			} catch (err) {
				console.error(err)
			}
		}

		fetchData()
	}, [])

	const handleFilter = ({ name }) => {
		let filtered = [...groups]

		if (name) {
			const search = name.toLowerCase().trim()
			filtered = filtered.filter(s =>
				s.full_name.toLowerCase().includes(search)
			)
		}
		setGroups(filtered)
	}

	const handleDelete = async id => {
		if (!confirm('Вы точно хотите удалить группу?')) return

		try {
			await deleteGroup(id)
			setGroups(prev => prev.filter(g => g.id !== id))
		} catch (err) {
			console.error(err)
		}
	}

	const groupsFields = [
		{ name: 'name', type: 'input', placeholder: 'Название группы' }
	]

	const columns = ['Название группы', 'Пропуски', 'Действия']

	const filterStudents = groupId =>
		students
			.filter(s => s.groupId === groupId)
			.flatMap(s => s.Attendances)
			.filter(a => a.present === false).length

	return (
		<>
			<Header nameList='Группы' />

			<SearchFilter
				fields={groupsFields}
				onFilter={handleFilter}
			/>

			<Paginated
				data={groups}
				columns={columns}
				renderRow={g => (
					<tr key={g.id}>
						<td className='p-3 border-t border-slate-100'>{g.name}</td>
						<td className='p-3 border-t border-slate-100'>
							{filterStudents(g.id)}
						</td>
						<td className='p-3 border-t border-slate-100'>
							<button
								className='px-4 py-2 text-white rounded-md transition cursor-pointer bg-red-600 hover:bg-red-800'
								onClick={() => handleDelete(g.id)}
							>
								Удалить
							</button>
						</td>
					</tr>
				)}
			/>
		</>
	)
}

export default Groups

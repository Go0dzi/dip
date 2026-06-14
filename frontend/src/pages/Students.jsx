import { useEffect, useRef, useState } from 'react'
import { AssignToStudentAttendance } from '../api/attendance.api'
import { getAllGroups } from '../api/group.api'
import {
	deleteStudent,
	getAllStudents,
	uploadFileStudents
} from '../api/student.api'
import Header from '../components/Header/Header'
import DateSelect from '../components/other/DateSelect'
import DeleteDB from '../components/other/DeleteDB'
import Paginated from '../components/other/Pagination'
import SearchFilter from '../components/other/SearchFilter'

const Students = () => {
	const [students, setStudents] = useState([])
	const [groups, setGroups] = useState([])
	const [filteredStudents, setFilteredStudents] = useState([])
	const [selectedDate, setSelectedDate] = useState(
		new Date().toISOString().split('T')[0]
	)
	const fileInputRef = useRef()

	useEffect(() => {
		const fetchStudents = async () => {
			try {
				const student = await getAllStudents()
				const group = await getAllGroups()
				setStudents(student)
				setFilteredStudents(student)
				setGroups(group)
			} catch (err) {
				console.error(err)
			}
		}

		fetchStudents()
	}, [])

	const handleDelete = async id => {
		if (!confirm('Вы точно хотите удалить студента?')) return

		try {
			await deleteStudent(id)
			setStudents(prev => prev.filter(s => s.id !== id))
			setFilteredStudents(prev => prev.filter(s => s.id !== id))
		} catch (err) {
			console.error(err)
		}
	}

	const handleAttendance = async (id, data, date, reason) => {
		try {
			await AssignToStudentAttendance(id, {
				date: date,
				present: data,
				reason: reason
			})

			const students = await getAllStudents()
			setStudents(students)
			setFilteredStudents(students)
		} catch (err) {
			console.error(err)
		}
	}
	const handleFilter = ({ name, groupId }) => {
		let filtered = [...students]

		if (name) {
			const search = name.toLowerCase().trim()
			filtered = filtered.filter(s =>
				s.full_name.toLowerCase().includes(search)
			)
		}

		if (groupId) {
			filtered = filtered.filter(s => String(s.groupId) === String(groupId))
		}

		setFilteredStudents(filtered)
	}

	const studentsFields = [
		{ name: 'name', type: 'input', placeholder: 'ФИО студента' },
		{
			name: 'groupId',
			type: 'select',
			placeholder: 'Выберите группу',
			options: groups.map(g => ({ label: g.name, value: g.id }))
		}
	]

	const columns = ['ФИО', 'Группа', 'Пропуски', 'Дата', 'Причина', 'Действия']

	const handleExport = () => {
		window.open('http://localhost:3000/api/upload/export', '_blank')
	}

	const handleClickImport = () => {
		fileInputRef.current.click()
	}

	const handleChangeImport = async e => {
		const file = e.target.files[0]
		if (!file) return

		const formData = new FormData()
		formData.append('file', file)

		try {
			await uploadFileStudents(formData)
			alert('Студенты загружены')
		} catch (err) {
			console.error(err)
			alert('Ошибка при загрузке')
		}
	}

	const reasons = [
		'Болел',
		'Семейные обстоятельства',
		'По уважительной причине',
		'Без уважительной причины',
		'Другое'
	]

	return (
		<>
			<Header nameList='Студенты' />

			<div className='flex gap-5 items-center mt-2'>
				<SearchFilter
					fields={studentsFields}
					onFilter={handleFilter}
				/>

				<div className='flex gap-5'>
					<button
						className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition cursor-pointer'
						onClick={handleClickImport}
					>
						Загрузить
					</button>
					<input
						ref={fileInputRef}
						type='file'
						accept='.xlsx, .xls'
						style={{ display: 'none' }}
						onChange={handleChangeImport}
					/>
					<button
						className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition cursor-pointer'
						onClick={() => handleExport()}
					>
						Выгрузить
					</button>

					<DeleteDB />
				</div>
			</div>

			<Paginated
				data={filteredStudents}
				columns={columns}
				renderRow={s => {
					const attendance = s?.Attendances?.find(a => a.date === selectedDate)
					const selectedReason = attendance?.reason || ''

					return (
						<tr key={s.id}>
							<td className='p-3 border-t border-slate-100'>{s.full_name}</td>
							<td className='p-3 border-t border-slate-100'>
								{groups.find(g => g.id === s.groupId)?.name || '-'}
							</td>
							<td className='p-3 border-t border-slate-100'>
								{s?.Attendances?.filter(a => a.present === false).length}
							</td>
							<td className='p-3 border-t border-slate-100'>
								<DateSelect
									value={selectedDate}
									onChange={setSelectedDate}
								/>
							</td>
							<td className='p-3 border-t border-slate-100'>
								<select
									value={selectedReason}
									onChange={e =>
										handleAttendance(
											s.id,
											attendance?.present ?? false,
											selectedDate,
											e.target.value
										)
									}
									className='border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
								>
									<option value=''>
										{attendance?.reason
											? attendance.reason
											: 'Выберите причину'}
									</option>
									{reasons.map(r => (
										<option
											key={r}
											value={r}
										>
											{r}
										</option>
									))}
								</select>
							</td>
							<td className='p-3 border-t border-slate-100'>
								<div className='flex gap-2'>
									<button
										className='px-4 py-2 text-white rounded-md transition cursor-pointer bg-emerald-600 hover:bg-emerald-800'
										onClick={() =>
											handleAttendance(
												s.id,
												true,
												selectedDate,
												attendance?.reason
											)
										}
									>
										Присутствовал
									</button>
									<button
										className='px-4 py-2 text-white rounded-md transition cursor-pointer bg-red-600 hover:bg-red-800'
										onClick={() =>
											handleAttendance(
												s.id,
												false,
												selectedDate,
												attendance?.reason
											)
										}
									>
										Отсутствовал
									</button>
									<button
										className='px-4 py-2 text-white rounded-md transition cursor-pointer bg-gray-400 hover:bg-gray-600'
										onClick={() => handleDelete(s.id)}
									>
										Удалить
									</button>
								</div>
							</td>
						</tr>
					)
				}}
			/>
		</>
	)
}

export default Students

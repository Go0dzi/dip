import { useEffect, useState } from 'react'
import { HiUserMinus } from 'react-icons/hi2'
import { AssignToStudentAttendance } from '../api/attendance.api'
import { getAllStudents } from '../api/student.api'
import Header from '../components/Header/Header'
import DateSelect from '../components/other/DateSelect'

const Attendances = () => {
	const [search, setSearch] = useState('')
	const [students, setStudents] = useState([])
	const [selectedStudents, setSelectedStudents] = useState([])
	const [reason, setReason] = useState('')
	const [selectedDate, setSelectedDate] = useState(
		new Date().toISOString().split('T')[0]
	)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const student = await getAllStudents()
				setStudents(student)
			} catch (err) {
				console.error(err)
			}
		}
		fetchData()
	}, [])

	const filteredStudents = students.filter(s =>
		s.full_name.toLowerCase().includes(search.toLowerCase())
	)

	const handleChange = async () => {
		try {
			for (const s of selectedStudents) {
				await AssignToStudentAttendance(s.id, {
					date: selectedDate,
					present: false
				})
			}

			const students = await getAllStudents()
			setStudents(students)
			setSelectedStudents([])
		} catch (err) {
			console.error(err)
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
			<Header nameList='Посещаемость' />

			<div className='bg-white border border-slate-200 rounded-xl shadow-sm p-6 w-full max-w-lg flex flex-col gap-4 mt-6 ml-6'>
				<div className='flex items-center gap-2'>
					<HiUserMinus className='text-red-500 text-lg' />
					<h2 className='text-sm font-semibold text-slate-700'>
						Отметить отсутствующих студентов
					</h2>
				</div>

				<div className='flex flex-col gap-3 relative'>
					<input
						type='text'
						value={search}
						onChange={e => setSearch(e.target.value)}
						className='border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
						placeholder='Поиск студента...'
					/>

					<DateSelect
						value={selectedDate}
						onChange={setSelectedDate}
					/>

					<select
						value={reason}
						onChange={e => setReason(e.target.value)}
						className='border p-2 rounded'
					>
						<option value=''>Выберите причину</option>
						{reasons.map(r => (
							<option
								value='r'
								key={r}
							>
								{r}
							</option>
						))}
					</select>

					{search && filteredStudents.length > 0 && (
						<div className='absolute top-full left-0 w-full bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10'>
							{filteredStudents.map(s => (
								<div
									key={s.id}
									className='px-3 py-2 text-sm cursor-pointer hover:bg-slate-100'
									onClick={() => {
										if (!selectedStudents.find(st => st.id === s.id)) {
											setSelectedStudents(prev => [...prev, s])
										}
										setSearch('')
									}}
								>
									{s.full_name}
								</div>
							))}
						</div>
					)}
				</div>

				{selectedStudents.length > 0 && (
					<div className='border-t border-slate-200 pt-3 flex flex-col gap-2'>
						{selectedStudents.map(s => (
							<div
								key={s.id}
								className='flex items-center justify-between bg-slate-50 px-3 py-2 rounded-lg text-sm'
							>
								<span className='text-slate-700'>{s.full_name}</span>

								<button
									onClick={() =>
										setSelectedStudents(prev =>
											prev.filter(st => st.id !== s.id)
										)
									}
									className='text-red-500 hover:text-red-600 text-xs'
								>
									Удалить
								</button>
							</div>
						))}

						<button
							className='mt-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 rounded-lg transition'
							onClick={handleChange}
						>
							Отметить как отсутствующих
						</button>
					</div>
				)}
			</div>
		</>
	)
}

export default Attendances

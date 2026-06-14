import { useEffect, useState } from 'react'
import { HiTrendingUp, HiUserGroup, HiUsers } from 'react-icons/hi'
import { HiChartBar } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { getMonthlyStats } from '../api/attendance.api'
import { getAllGroups } from '../api/group.api'
import { getAllStudents } from '../api/student.api'
import AttendanceHeatmap from '../components/Graph/AttendanceHeatMap'
import AttendancePie from '../components/Graph/AttendancePie'
import AttendanceStats from '../components/Graph/AttendanceStats'
import AttendanceTrend from '../components/Graph/Attendancetrend'
import GroupCompareChart from '../components/Graph/GroupCompare'
import TopStudentsChart from '../components/Graph/TopStudents'
import Header from '../components/Header/Header'

const MONTHS_RU = [
	'Янв',
	'Фев',
	'Мар',
	'Апр',
	'Май',
	'Июн',
	'Июл',
	'Авг',
	'Сен',
	'Окт',
	'Ноя',
	'Дек'
]

const Main = () => {
	const navigate = useNavigate()
	const [groups, setGroups] = useState([])
	const [students, setStudents] = useState([])
	const [monthlyStats, setMonthlyStats] = useState({})

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [monthlyState, group, student] = await Promise.all([
					getMonthlyStats(),
					getAllGroups(),
					getAllStudents()
				])
				setMonthlyStats(monthlyState)
				setGroups(group)
				setStudents(student)
			} catch (err) {
				console.error(err)
			}
		}
		fetchData()
	}, [])

	const studentsAttendances = students.map(student => {
		if (!student.Attendances || student.Attendances.length === 0) {
			return { id: student.id, full_name: student.full_name, present: false }
		}
		const last = student.Attendances[student.Attendances.length - 1]
		return {
			id: student.id,
			full_name: student.full_name,
			present: last.present
		}
	})

	const pieData = [
		{
			value: studentsAttendances.filter(s => s.present).length,
			name: 'Присутствуют'
		},
		{
			value: studentsAttendances.filter(s => !s.present).length,
			name: 'Отсутствуют'
		}
	]

	const monthData = Object.keys(monthlyStats).map(date => ({
		day: date.slice(5),
		count: monthlyStats[date].filter(a => !a.present).length
	}))

	const heatmapData = Object.keys(monthlyStats).map(date => [
		date,
		monthlyStats[date].filter(a => a.present).length
	])

	const topStudents = students.map(student => {
		const total = student.Attendances?.length ?? 0
		const present = student.Attendances?.filter(a => a.present).length ?? 0
		return {
			full_name: student.full_name,
			percent: total > 0 ? Math.round((present / total) * 100) : 0
		}
	})

	const groupStats = groups.map(group => {
		const groupStudents = students.filter(s => s.groupId === group.id)
		const allAttendances = groupStudents.flatMap(s => s.Attendances ?? [])
		const total = allAttendances.length
		const present = allAttendances.filter(a => a.present).length
		const attendance = total > 0 ? Math.round((present / total) * 100) : 0

		const sorted = [...allAttendances].sort((a, b) =>
			a.date > b.date ? 1 : -1
		)
		let maxStreak = 0
		let streak = 0
		for (const a of sorted) {
			if (!a.present) {
				streak++
				maxStreak = Math.max(maxStreak, streak)
			} else streak = 0
		}
		const regularity = Math.max(0, Math.round(100 - maxStreak * 10))

		return { name: group.name, attendance, regularity }
	})

	const trendData = (() => {
		const byMonth = {}
		Object.keys(monthlyStats).forEach(date => {
			const m = parseInt(date.slice(5, 7)) - 1
			if (!byMonth[m]) byMonth[m] = { present: 0, total: 0 }
			monthlyStats[date].forEach(a => {
				byMonth[m].total++
				if (a.present) byMonth[m].present++
			})
		})

		const today = new Date()
		const currentMonth = today.getMonth()

		return Array.from({ length: 8 }, (_, i) => {
			const monthIdx = (currentMonth - 7 + i + 12) % 12
			const stat = byMonth[monthIdx]
			const percent =
				stat?.total > 0 ? Math.round((stat.present / stat.total) * 100) : null
			const isPast = i < 6
			return {
				month: MONTHS_RU[monthIdx],
				actual: isPast ? percent : null,
				forecast: !isPast
					? (percent ??
						(byMonth[currentMonth - 1]?.total > 0
							? Math.round(
									(byMonth[currentMonth - 1].present /
										byMonth[currentMonth - 1].total) *
										100
								) + i
							: null))
					: null
			}
		})
	})()

	return (
		<div className='min-h-screen bg-gray-100'>
			<Header nameList='Общая статистика' />

			<main className='p-6 flex gap-5'>
				<section className='grid grid-cols-2 gap-4 flex-1'>
					<div className='bg-white border border-slate-200 rounded-xl shadow-sm p-5'>
						<div className='flex items-center gap-3'>
							<HiUsers size={28} />
							<h2 className='text-slate-700 font-semibold text-sm tracking-wide'>
								Всего студентов
							</h2>
						</div>
						<p className='text-2xl font-semibold text-slate-800 mt-2'>
							{students.length}
						</p>
					</div>

					<div className='bg-white border border-slate-200 rounded-xl shadow-sm p-5'>
						<div className='flex items-center gap-3'>
							<HiUserGroup size={28} />
							<h2 className='text-slate-700 font-semibold text-sm tracking-wide'>
								Всего групп
							</h2>
						</div>
						<p className='text-2xl font-semibold text-slate-800 mt-2'>
							{groups.length}
						</p>
					</div>

					<div className='col-span-2 bg-white p-4 rounded-lg shadow'>
						<div className='flex justify-between items-center'>
							<div className='flex gap-18 flex-col'>
								<div className='flex items-center gap-3 mb-4'>
									<HiTrendingUp size={28} />
									<h2>Средняя посещаемость</h2>
								</div>
								<div className='flex gap-3 flex-col'>
									<button
										className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition cursor-pointer'
										onClick={() => navigate('/attendances')}
									>
										Отметить посещаемость
									</button>
									<button
										className='px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition cursor-pointer'
										onClick={() => navigate('/students')}
									>
										Перейти к отчетам
									</button>
								</div>
							</div>
							<div className='w-63 h-63'>
								<AttendancePie data={pieData} />
							</div>
						</div>
					</div>

					<div className='col-span-2'>
						<TopStudentsChart students={topStudents} />
					</div>

					<div className='col-span-2'>
						<GroupCompareChart groups={groupStats} />
					</div>
				</section>

				<aside className='w-155 flex flex-col gap-4'>
					<div className='bg-white border border-slate-200 rounded-xl shadow-sm p-5'>
						<div className='flex items-center gap-2 mb-1'>
							<HiChartBar size={16} />
							<h2 className='font-semibold text-slate-700 text-sm'>
								Посещаемость за месяц (Отсутствующие)
							</h2>
						</div>
						<div className='w-full h-72'>
							<AttendanceStats monthData={monthData} />
						</div>
					</div>

					<AttendanceTrend trendData={trendData} />

					<AttendanceHeatmap
						data={heatmapData}
						year={new Date().getFullYear()}
					/>
				</aside>
			</main>
		</div>
	)
}

export default Main

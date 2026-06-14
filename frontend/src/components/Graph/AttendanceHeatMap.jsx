import ReactECharts from 'echarts-for-react'
import { HiCalendar } from 'react-icons/hi'

const AttendanceHeatmap = ({ data = [], year = new Date().getFullYear() }) => {
	const option = {
		tooltip: {
			backgroundColor: '#1e293b',
			borderColor: '#334155',
			textStyle: { color: '#f1f5f9', fontSize: 12 },
			formatter: p =>
				`<b>${p.data[0]}</b><br/>Присутствовало: <b>${p.data[1]}</b>`
		},
		visualMap: {
			min: 0,
			max: 40,
			type: 'continuous',
			orient: 'horizontal',
			left: 'center',
			bottom: 0,
			text: ['Много', 'Мало'],
			textStyle: { color: '#94a3b8', fontSize: 10 },
			inRange: {
				color: ['#f0f9ff', '#bae6fd', '#38bdf8', '#0284c7', '#0c4a6e']
			},
			itemWidth: 12,
			itemHeight: 80
		},
		calendar: {
			top: 30,
			left: 30,
			right: 10,
			cellSize: ['auto', 16],
			range: `${year}`,
			itemStyle: { borderWidth: 2, borderColor: '#ffffff' },
			yearLabel: { show: false },
			monthLabel: {
				color: '#64748b',
				fontSize: 11,
				nameMap: [
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
			},
			dayLabel: {
				color: '#94a3b8',
				fontSize: 10,
				nameMap: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
			},
			splitLine: { show: false }
		},
		series: [{ type: 'heatmap', coordinateSystem: 'calendar', data }]
	}

	return (
		<div className='bg-white border border-slate-200 rounded-xl shadow-sm p-5'>
			<div className='flex items-center gap-2 mb-3'>
				<HiCalendar
					size={16}
					className='text-sky-500'
				/>
				<h2 className='font-semibold text-slate-700 text-sm'>
					График посещаемости — {year}
				</h2>
			</div>
			<ReactECharts
				option={option}
				style={{ width: '100%', height: '180px' }}
				opts={{ renderer: 'svg' }}
			/>
		</div>
	)
}

export default AttendanceHeatmap

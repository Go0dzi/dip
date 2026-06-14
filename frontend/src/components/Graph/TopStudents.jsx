import ReactECharts from 'echarts-for-react'
import { GiTrophyCup } from 'react-icons/gi'

const TopStudentsChart = ({ students = [] }) => {
	const top = [...students].sort((a, b) => b.percent - a.percent).slice(0, 8)

	const colors = [
		'#0ea5e9',
		'#6366f1',
		'#10b981',
		'#f59e0b',
		'#ef4444',
		'#8b5cf6',
		'#ec4899',
		'#14b8a6'
	]

	const option = {
		tooltip: {
			trigger: 'item',
			backgroundColor: '#1e293b',
			borderColor: '#334155',
			textStyle: { color: '#f1f5f9', fontSize: 12 },
			formatter: p => `<b>${p.name}</b><br/>Посещаемость: <b>${p.value}%</b>`
		},
		grid: {
			left: '2%',
			right: '2%',
			top: '5%',
			bottom: '5%',
			containLabel: true
		},
		xAxis: {
			type: 'value',
			max: 100,
			axisLabel: { color: '#94a3b8', fontSize: 11, formatter: '{value}%' },
			splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
			axisLine: { show: false },
			axisTick: { show: false }
		},
		yAxis: {
			type: 'category',
			data: top.map(s => s.full_name.split(' ').slice(0, 2).join(' ')),
			axisLabel: { color: '#475569', fontSize: 12, fontWeight: 500 },
			axisLine: { show: false },
			axisTick: { show: false }
		},
		series: [
			{
				type: 'bar',
				data: top.map((s, i) => ({
					value: s.percent,
					itemStyle: {
						color: {
							type: 'linear',
							x: 0,
							y: 0,
							x2: 1,
							y2: 0,
							colorStops: [
								{ offset: 0, color: colors[i % colors.length] + '99' },
								{ offset: 1, color: colors[i % colors.length] }
							]
						},
						borderRadius: [0, 6, 6, 0]
					}
				})),
				barMaxWidth: 18,
				label: {
					show: true,
					position: 'right',
					color: '#64748b',
					fontSize: 11,
					formatter: '{c}%'
				},
				showBackground: true,
				backgroundStyle: { color: '#f8fafc', borderRadius: [0, 6, 6, 0] }
			}
		]
	}

	return (
		<div className='bg-white border border-slate-200 rounded-xl shadow-sm p-5 h-full'>
			<div className='flex items-center gap-2 mb-3'>
				<GiTrophyCup
					size={16}
					className='text-yellow-500'
				/>
				<h2 className='font-semibold text-slate-700 text-sm'>
					Топ студентов по посещаемости
				</h2>
			</div>
			<ReactECharts
				option={option}
				style={{ width: '100%', height: '260px' }}
				opts={{ renderer: 'svg' }}
			/>
		</div>
	)
}

export default TopStudentsChart

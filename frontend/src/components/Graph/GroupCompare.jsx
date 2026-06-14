import ReactECharts from 'echarts-for-react'
import { HiChartPie } from 'react-icons/hi2'

const GroupCompareChart = ({ groups = [] }) => {
	const colors = [
		'#0ea5e9',
		'#6366f1',
		'#10b981',
		'#f59e0b',
		'#ef4444',
		'#8b5cf6'
	]

	const seriesData = groups.slice(0, 6).map((g, i) => ({
		name: g.name,
		value: [g.attendance ?? 0, g.regularity ?? 0],
		lineStyle: { color: colors[i], width: 2 },
		itemStyle: { color: colors[i] },
		areaStyle: { color: colors[i] + '22' }
	}))

	const option = {
		tooltip: {
			trigger: 'item',
			backgroundColor: '#1e293b',
			borderColor: '#334155',
			textStyle: { color: '#f1f5f9', fontSize: 12 },
			formatter: p =>
				`<b>${p.name}</b><br/>Посещаемость: <b>${p.value[0]}%</b><br/>Регулярность: <b>${p.value[1]}%</b>`
		},
		legend: {
			bottom: 0,
			itemWidth: 10,
			itemHeight: 10,
			textStyle: { color: '#64748b', fontSize: 11 },
			icon: 'circle'
		},
		radar: {
			indicator: [
				{ name: 'Посещаемость', max: 100 },
				{ name: 'Регулярность', max: 100 }
			],
			center: ['50%', '45%'],
			radius: '60%',
			axisName: { color: '#64748b', fontSize: 13, fontWeight: 500 },
			splitLine: { lineStyle: { color: '#e2e8f0' } },
			splitArea: { areaStyle: { color: ['#f8fafc', '#ffffff'] } },
			axisLine: { lineStyle: { color: '#e2e8f0' } }
		},
		series: [{ type: 'radar', data: seriesData }]
	}

	return (
		<div className='bg-white border border-slate-200 rounded-xl shadow-sm p-5 h-full'>
			<div className='flex items-center gap-2 mb-1'>
				<HiChartPie
					size={16}
					className='text-indigo-500'
				/>
				<h2 className='font-semibold text-slate-700 text-sm'>
					Сравнение групп
				</h2>
			</div>
			<ReactECharts
				option={option}
				style={{ width: '100%', height: '300px' }}
				opts={{ renderer: 'svg' }}
			/>
		</div>
	)
}

export default GroupCompareChart

import ReactECharts from 'echarts-for-react'
import { HiTrendingUp } from 'react-icons/hi'

const AttendanceTrend = ({ trendData = [] }) => {
	const option = {
		tooltip: {
			trigger: 'axis',
			backgroundColor: '#1e293b',
			borderColor: '#334155',
			textStyle: { color: '#f1f5f9', fontSize: 12 },
			formatter: params => {
				let html = `<div style="padding:4px 8px"><div style="color:#94a3b8;margin-bottom:6px">${params[0].axisValue}</div>`
				params.forEach(p => {
					if (p.value != null) {
						html += `<div style="display:flex;align-items:center;gap:6px">
							<span style="width:8px;height:8px;border-radius:50%;background:${p.color};display:inline-block"></span>
							<span style="color:#cbd5e1">${p.seriesName}:</span>
							<b style="color:#f1f5f9">${p.value}%</b>
						</div>`
					}
				})
				return html + '</div>'
			}
		},
		legend: {
			bottom: 0,
			itemWidth: 16,
			itemHeight: 3,
			textStyle: { color: '#64748b', fontSize: 11 }
		},
		grid: {
			left: '2%',
			right: '2%',
			top: '8%',
			bottom: '14%',
			containLabel: true
		},
		xAxis: {
			type: 'category',
			data: trendData.map(d => d.month),
			axisLabel: { color: '#94a3b8', fontSize: 11 },
			axisLine: { lineStyle: { color: '#e2e8f0' } },
			axisTick: { show: false },
			splitLine: { show: false }
		},
		yAxis: {
			type: 'value',
			min: 50,
			max: 100,
			axisLabel: { color: '#94a3b8', fontSize: 11, formatter: '{value}%' },
			splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
			axisLine: { show: false },
			axisTick: { show: false }
		},
		series: [
			{
				name: 'Фактически',
				type: 'line',
				data: trendData.map(d => d.actual ?? null),
				smooth: true,
				connectNulls: false,
				symbolSize: 7,
				itemStyle: { color: '#0ea5e9', borderColor: '#fff', borderWidth: 2 },
				lineStyle: { color: '#0ea5e9', width: 2.5 },
				areaStyle: {
					color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [
							{ offset: 0, color: 'rgba(14,165,233,0.2)' },
							{ offset: 1, color: 'rgba(14,165,233,0)' }
						]
					}
				}
			},
			{
				name: 'Прогноз',
				type: 'line',
				data: trendData.map(d => d.forecast ?? null),
				smooth: true,
				connectNulls: false,
				symbolSize: 7,
				symbol: 'emptyCircle',
				itemStyle: { color: '#f59e0b', borderColor: '#fff', borderWidth: 2 },
				lineStyle: { color: '#f59e0b', width: 2, type: 'dashed' }
			}
		]
	}

	return (
		<div className='bg-white border border-slate-200 rounded-xl shadow-sm p-5 h-full'>
			<div className='flex items-center gap-2 mb-1'>
				<HiTrendingUp
					size={16}
					className='text-emerald-500'
				/>
				<h2 className='font-semibold text-slate-700 text-sm'>
					Динамика посещаемости по месяцам
				</h2>
			</div>
			<ReactECharts
				option={option}
				style={{ width: '100%', height: '240px' }}
				opts={{ renderer: 'svg' }}
			/>
		</div>
	)
}

export default AttendanceTrend

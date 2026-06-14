import ReactECharts from 'echarts-for-react'

const AttendanceStats = ({ monthData }) => {
	const option = {
		tooltip: {
			trigger: 'axis',
			backgroundColor: '#1e293b',
			borderColor: '#334155',
			borderWidth: 1,
			textStyle: { color: '#f1f5f9', fontFamily: 'inherit', fontSize: 12 },
			formatter: params => {
				const p = params[0]
				return `<div style="padding:4px 8px">
					<div style="color:#94a3b8;margin-bottom:4px">${p.axisValue}</div>
					<div style="font-size:16px;font-weight:600;color:#38bdf8">${p.value} <span style="font-size:12px;color:#94a3b8">студ.</span></div>
				</div>`
			}
		},
		grid: {
			left: '2%',
			right: '2%',
			top: '12%',
			bottom: '8%',
			containLabel: true
		},
		xAxis: {
			type: 'category',
			data: monthData?.map(d => d.day) ?? [],
			axisTick: { show: false },
			axisLine: { lineStyle: { color: '#e2e8f0' } },
			axisLabel: {
				color: '#94a3b8',
				fontSize: 11,
				interval: 4,
				formatter: val => val
			},
			splitLine: { show: false }
		},
		yAxis: {
			type: 'value',
			axisLabel: { color: '#94a3b8', fontSize: 11 },
			splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
			axisLine: { show: false },
			axisTick: { show: false }
		},
		series: [
			{
				name: 'Посещаемость',
				type: 'line',
				data: monthData?.map(d => d.count) ?? [],
				smooth: true,
				symbol: 'circle',
				symbolSize: 6,
				showSymbol: false,
				emphasis: {
					focus: 'series',
					scale: true,
					itemStyle: { color: '#0ea5e9', borderColor: '#fff', borderWidth: 2 }
				},
				lineStyle: { color: '#0ea5e9', width: 2.5 },
				itemStyle: { color: '#0ea5e9' },
				areaStyle: {
					color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [
							{ offset: 0, color: 'rgba(14,165,233,0.25)' },
							{ offset: 1, color: 'rgba(14,165,233,0.01)' }
						]
					}
				}
			}
		]
	}

	return (
		<ReactECharts
			option={option}
			style={{ width: '100%', height: '100%' }}
			opts={{ renderer: 'svg' }}
		/>
	)
}

export default AttendanceStats

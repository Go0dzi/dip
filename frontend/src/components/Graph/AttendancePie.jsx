import ReactECharts from 'echarts-for-react'

const AttendancePie = ({ data }) => {
	const total = data.reduce((sum, item) => sum + item.value, 0)
	const present = data.find(d => d.name === 'Присутствуют')
	const percent = present ? Math.round((present.value / total) * 100) : 0

	const option = {
		tooltip: {
			trigger: 'item',
			formatter: '{b}: {c} ({d}%)'
		},
		series: [
			{
				name: 'Посещаемость',
				type: 'pie',
				radius: ['40%', '70%'],
				avoidLabelOverlap: false,
				itemStyle: {
					borderRadius: 10,
					borderColor: '#fff',
					borderWidth: 2
				},
				label: {
					show: true,
					position: 'center',
					fontSize: 22,
					fontWeight: 'bold',
					formatter: () => `${percent}%`,
					color: '#3b82f6'
				},
				labelLine: { show: false },
				data,
				emphasis: {
					scale: true
				}
			}
		]
	}

	return (
		<ReactECharts
			option={option}
			style={{ width: '100%', height: '100%' }}
		/>
	)
}

export default AttendancePie

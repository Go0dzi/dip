import { useMemo } from 'react'

const DateSelect = ({ value, onChange }) => {
	const dates = useMemo(() => {
		const now = new Date()
		const year = now.getFullYear()
		const month = now.getMonth()
		const daysInMonth = new Date(year, month + 1, 0).getDate()

		const allDates = []
		for (let day = 1; day <= daysInMonth; day++) {
			const date = new Date(year, month, day)
			allDates.push(date.toISOString().split('T')[0])
		}
		return allDates
	}, [])

	return (
		<select
			value={value}
			onChange={e => onChange(e.target.value)}
			className='border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
		>
			{dates.map(d => (
				<option
					key={d}
					value={d}
				>
					{d}
				</option>
			))}
		</select>
	)
}

export default DateSelect

import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

const SearchFilter = ({ fields = [], onFilter }) => {
	const [values, setValues] = useState({})

	const handleChange = (name, value) => {
		setValues(prev => ({
			...prev,
			[name]: value
		}))
	}

	const handleFilter = () => {
		onFilter(values)
	}

	return (
		<div className='flex gap-4 flex-wrap mb-4 mt-4 ml-4'>
			{fields.map(field => {
				if (field.type === 'input') {
					return (
						<input
							key={field.name}
							type={field.inputType || 'text'}
							placeholder={field.placeholder}
							value={values[field.name] || ''}
							onChange={e => handleChange(field.name, e.target.value)}
							className='border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
					)
				}

				if (field.type === 'select') {
					return (
						<select
							key={field.name}
							value={values[field.name] || ''}
							onChange={e => handleChange(field.name, e.target.value)}
							className='border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
						>
							<option value=''>{field.placeholder || 'Выберите'}</option>
							{field.options.map(opt => (
								<option
									key={opt.value}
									value={opt.value}
								>
									{opt.label}
								</option>
							))}
						</select>
					)
				}

				return null
			})}

			<button
				onClick={handleFilter}
				className='flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition'
			>
				<FaSearch size={18} />
				Поиск
			</button>
		</div>
	)
}

export default SearchFilter

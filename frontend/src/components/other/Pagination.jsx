import { useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

const Paginated = ({ data = [], columns = [], renderRow }) => {
	const [page, setPage] = useState(1)
	const limit = 15

	const totalPages = Math.ceil(data.length / limit)
	const startIndex = (page - 1) * limit
	const currentData = data.slice(startIndex, startIndex + limit)

	const visiblePages = 5
	let startPage = Math.max(1, page - Math.floor(visiblePages / 2))
	let endPage = startPage + visiblePages - 1

	if (endPage > totalPages) {
		endPage = totalPages
		startPage = Math.max(1, endPage - visiblePages + 1)
	}

	return (
		<div className='p-4'>
			<div className='bg-white border border-slate-200 rounded-xl shadow-sm overflow-x-auto mt-2'>
				<table className='w-full text-slate-700'>
					<thead>
						<tr>
							{columns.map(col => (
								<th
									key={col}
									className='p-3 text-left text-sm font-semibold text-slate-600 bg-slate-50'
								>
									{col}
								</th>
							))}
						</tr>
					</thead>

					<tbody>
						{currentData.length === 0 ? (
							<tr>
								<td
									colSpan={columns.length}
									className='text-center p-4'
								>
									Нет данных
								</td>
							</tr>
						) : (
							currentData.map(item => renderRow(item))
						)}
					</tbody>
				</table>

				<div className='flex gap-2 justify-center mt-2 pb-2 items-center'>
					<button
						className='px-2 py-1 text-slate-600 hover:text-blue-600 transition cursor-pointer'
						onClick={() => setPage(p => Math.max(1, p - 1))}
					>
						<FaArrowLeft />
					</button>

					{Array.from(
						{ length: endPage - startPage + 1 },
						(_, i) => startPage + i
					).map(p => (
						<button
							key={p}
							className='px-2 py-1 text-slate-600 hover:text-blue-600 transition cursor-pointer'
							onClick={() => setPage(p)}
						>
							{p}
						</button>
					))}

					<button
						className='px-2 py-1 text-slate-600 hover:text-blue-600 transition cursor-pointer'
						onClick={() => setPage(p => Math.min(totalPages, p + 1))}
					>
						<FaArrowRight />
					</button>
				</div>
			</div>
		</div>
	)
}

export default Paginated

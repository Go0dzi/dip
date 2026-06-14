import { deleteDataBase } from '../../api/admin.api'

const DeleteDB = () => {
	const handleDelete = async () => {
		const confirms = confirm('Вы точно хотите удалить все данные?')

		if (confirms) {
			await deleteDataBase()
			console.log('Данные удалены')
		} else {
			console.log('Откат')
		}
	}

	return (
		<>
			<button
				className='px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition cursor-pointer'
				onClick={handleDelete}
			>
				Очистить базу данных
			</button>
		</>
	)
}

export default DeleteDB

import { nanoid } from 'nanoid'
import React, { useEffect, useState } from 'react'
import Todo from './components/Todo'
import Form from './components/Form'
import FilterButton from './components/FilterButton'
import FILTER_MAP from './data/filter'

// Значения фильтров 
const FILTER_NAMES = Object.keys(FILTER_MAP)

// Отображение статуса задачи при рендере 
function changeStatus(id, completed) {
	if (completed === true) {
		document.getElementById(id).style.background = 'green'
	}
	else {
		document.getElementById(id).style.background = 'none'
	}
}

export default function App(props) {
	// Для добавления новых задач
	const [tasks, setTasks] = useState(props.tasks)

	const [filter, setFilter] = useState('Все')

	// Динамическое создание компонентов Todo, с использованием фильтров 
	const taskList = tasks.filter(FILTER_MAP[filter]).map((task) => {
		return (
			<Todo
				// props
				name={task.name}
				id={task.id}
				completed={task.completed}
				key={task.id}
				toggleTaskCompleted={toggleTaskCompleted}
				deleteTask={deleteTask}
				editTask={editTask}
				changeStatus={changeStatus}
				getEditingTask={getEditingTask}
			/>)
	})

	// Создание компонентов FilterButton, включая заполнение их переданными параметрами фильтров
	const filterList = FILTER_NAMES.map(name =>
		< FilterButton
			name={name}
			key={name}
			isPressed={name === filter}
			setFilter={setFilter}
		/>)

	// Изменение отображения количества задач
	const headingText =
		(taskList.length % 10 == 0 || taskList.length % 10 >= 5 || (taskList.length > 10))
			? `${taskList.length} задач`
			: (taskList.length % 10 == 1)
				? `${taskList.length} задача`
				: `${taskList.length} задачи`

	// Функция для добавления задачи
	function addTask(name) {
		const newTask = { id: 'todo-' + nanoid(), name: name, completed: false }
		setTasks([...tasks, newTask]) // Создание нового компонента
	}

	// Функция для удаления задачи
	function deleteTask(id) {
		const remainingTasks = tasks.filter(task => id !== task.id)
		setTasks(remainingTasks) // Удаление компонента из списка
	}

	// Функция для редактирования задачи
	function editTask(id, newName) {
		const editingTasks = tasks.map(task => {
			if (id === task.id) {
				document.getElementById(id).style.background = 'none'
				return { ...tasks, name: newName, id, completed: false } //Возвращает список задач, включая измененную
			}
			return task
		})
		setTasks(editingTasks)
	}

	function toggleTaskCompleted(id) {
		// Обновление списка задач
		const updatedTasks = tasks.map((task) => {
			// Если текущая задача имеет тот же id, что и редактирумая 
			if (id === task.id) {
				if (task.completed === false) {
					document.getElementById(id).style.background = 'green'
				}
				else {
					document.getElementById(id).style.background = 'none'
				}
				// используется object spread для создания копии этого объекта
				// у которого свойство `completed` будет инверсировано
				return { ...task, completed: !task.completed }
			}
			return task
		})

		setTasks(updatedTasks)
	}

	//! РЕДАКТИРОВАНИЕ ЗАДАЧИ 
	// Состояния редактирования задачи
	const [isEditing, setEditing] = useState(false)
	const [newName, setNewName] = useState('')
	const [editingProps, setEditingProps] = useState({})

	// Получение свойств компонента выбранной задачи
	function getEditingTask(taskProps) {
		setEditing(true)
		setEditingProps(taskProps)
	}

	function handleChange(event) {
		setNewName(event.target.value)
	}

	// Для изменения названия задачи при нажатии на кнопку
	function handleSubmit(event) {
		event.preventDefault()
		disabledDeleteButton(!isEditing)
		if (newName.trim().length > 0) {
			editingProps.editTask(editingProps.id, newName)
			setNewName('')
		}
		setEditing(false)
	}

	function disabledDeleteButton(isEditing) {
		const deleteButton = document.querySelector(`#${editingProps.id}`).parentNode.nextSibling.querySelector('.btn__danger')
		if (isEditing) {
			deleteButton.setAttribute('disabled', 'disabled')
			deleteButton.style.background = 'gray'
			deleteButton.style.borderColor = '#000'
		}
		else {
			deleteButton.removeAttribute('disabled')
			deleteButton.style.background = '#ca3c3c'
			deleteButton.style.borderColor = '#bd2130'

		}
	}

	// Проверяет, редактировалось ли поле до текущего клика
	useEffect(() => {
		if (isEditing)
			disabledDeleteButton(isEditing)
	}, [isEditing]) // Запуск только при изменении значения

	//! КОНЕЦ РЕДАКТИРОВАНИЕ ЗАДАЧИ 

	return (
		<div className='todoapp stack-large'>
			<div className='menu'>
				<h1>Todo-app</h1>
				<div className='create--block'>
					{/* Форма для добавления задач */}
					<Form addTask={addTask} />

					<div className='filters btn-group stack-exception'>
						{/* Фильтры задач */}
						{filterList}
					</div>
				</div>
				<div className='list--block'>
					<h2 id='list-heading'>
						{/* Заголовок задач */}
						{headingText}
					</h2>
					<ul
						role='list'
						className='todo-list stack-large stack-exception'
					>
						{/* Передача динамически создаваемых компонентов */}
						{taskList}

					</ul>
				</div>
			</div>
			{/* Редактирование задач */}
			<div className='edit'>
				{isEditing
					? <form className='stack-small'
						onSubmit={handleSubmit}>
						<div className='form-group'>
							<input
								id={editingProps.id}
								className='todo-text'
								type='text'
								placeholder={'Новое название для ' + editingProps.name}
								onChange={handleChange}
							/>
						</div>
						<div className='btn-group'>
							<button type='button' className='btn todo-cancel'
								onClick={() => {
									disabledDeleteButton(!isEditing)
									setEditing(false)
								}
								}
							>
								Отмена
							</button>
							<button type='submit' className='btn btn__primary todo-edit'>
								Сохранение
							</button>
						</div>
					</form>
					: <h1>Задача не выбрана</h1>}
			</div>
		</div>
	)
}

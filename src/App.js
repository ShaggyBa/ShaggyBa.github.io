import { nanoid } from 'nanoid'
import React, { useState } from 'react'
import Todo from './components/Todo'
import Form from './components/Form'
import FilterButton from './components/FilterButton'
import FILTER_MAP from './data/filter'

// Значения фильтров 
const FILTER_NAMES = Object.keys(FILTER_MAP)

export default function App(props) {
	// Для добавления новых задач
	const [tasks, setTasks] = useState(props.tasks)

	const [filter, setFilter] = useState('Все')

	// Динамическое создание компонентов Todo, включая заполнение переданными параметрами  
	const taskList = tasks.filter(FILTER_MAP[filter]).map((task) =>
		<Todo
			// props
			name={task.name}
			id={task.id}
			completed={task.completed}
			key={task.id}
			toggleTaskCompleted={toggleTaskCompleted}
			deleteTask={deleteTask}
			editTask={editTask}
		/>)

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


	// Функция, получающая введенный в форме текст и создающая новый объект task
	function addTask(name) {
		const newTask = { id: 'todo-' + nanoid(), name: name, completed: false }
		setTasks([...tasks, newTask])
	}

	// Функция для удаления задачи, получающая id 
	function deleteTask(id) {
		const remainingTasks = tasks.filter(task => id !== task.id)
		setTasks(remainingTasks)
	}

	function editTask(id, newName) {
		const editingTasks = tasks.map(task => {
			if (id === task.id) {
				return { ...tasks, name: newName, id }
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
				// используется object spread для создания копии этого объекта
				// у которого свойство `completed` будет инверсировано
				return { ...task, completed: !task.completed }
			}
			return task
		})

		setTasks(updatedTasks)
	}

	return (
		<div className='todoapp stack-large'>
			<h1>TodoMatic</h1>
			<div className='menu--block'>
				<Form addTask={addTask} />

				<div className='filters btn-group stack-exception'>
					{filterList}
				</div>
			</div>
			<div className='list--block'>
				<h2 id='list-heading'>
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
	)
}

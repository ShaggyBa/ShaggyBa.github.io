import { nanoid } from 'nanoid'
import React, { useEffect, useState } from 'react'
import Todo from './components/Todo'
import Form from './components/Form'
import FilterButton from './components/FilterButton'
import FILTER_MAP from './data/filters/filter'

const FILTER_NAMES = Object.keys(FILTER_MAP)

function changeStatus(id, completed) {
	const element = document.getElementById(id)
	if (completed) {
		element.style.background = 'green'
	} else {
		element.style.background = 'none'
	}
}

export default function App(props) {
	const [tasks, setTasks] = useState(props.tasks)
	const [filter, setFilter] = useState('Все')
	const [isEditing, setEditing] = useState(false)
	const [newName, setNewName] = useState('')
	const [editingProps, setEditingProps] = useState({})

	const taskList = tasks.filter(FILTER_MAP[filter]).map((task) => (
		<Todo
			name={task.name}
			id={task.id}
			completed={task.completed}
			key={task.id}
			toggleTaskCompleted={toggleTaskCompleted}
			deleteTask={deleteTask}
			editTask={editTask}
			changeStatus={changeStatus}
			getEditingTask={getEditingTask}
		/>
	))

	const filterList = FILTER_NAMES.map((name) => (
		<FilterButton
			name={name}
			key={name}
			isPressed={name === filter}
			setFilter={setFilter}
		/>
	))

	const headingText =
		taskList.length === 1
			? `${taskList.length} задача`
			: `${taskList.length} задач`

	function addTask(name) {
		const newTask = { id: 'todo-' + nanoid(), name: name, completed: false }
		setTasks((prevTasks) => [...prevTasks, newTask])
	}

	function deleteTask(id) {
		setTasks((prevTasks) => prevTasks.filter((task) => id !== task.id))
	}

	function editTask(id, newName) {
		setTasks((prevTasks) =>
			prevTasks.map((task) => {
				if (id === task.id) {
					return { ...task, name: newName, completed: false }
				}
				return task
			})
		)
	}

	function toggleTaskCompleted(id) {
		setTasks((prevTasks) =>
			prevTasks.map((task) => {
				if (id === task.id) {
					const completed = !task.completed
					changeStatus(id, completed)
					return { ...task, completed }
				}
				return task
			})
		)
	}

	function getEditingTask(taskProps) {
		setEditing(true)
		setEditingProps(taskProps)
	}

	function handleChange(event) {
		setNewName(event.target.value)
	}

	function handleSubmit(event) {
		event.preventDefault()
		if (newName.trim().length > 0) {
			editingProps.editTask(editingProps.id, newName)
			setNewName('')
		}
		setEditing(false)
	}

	function disabledDeleteButton() {
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

	useEffect(() => {
		if (isEditing)
			disabledDeleteButton()
	}, [isEditing])§

	return (
		<div className="todoapp stack-large">
			<div className="menu">
				<h1>Todo-app</h1>
				<div className="create--block">
					<Form addTask={addTask} />
					<div className="filters btn-group stack-exception">
						{filterList}
					</div>
				</div>
				<div className="list--block">
					<h2 id="list-heading">{headingText}</h2>
					<ul role="list" className="todo-list stack-large stack-exception">
						{taskList}
					</ul>
				</div>
			</div>
			<div className="edit">
				{isEditing ? (
					<form className="stack-small" onSubmit={handleSubmit}>
						<div className="form-group">
							<input
								id={editingProps.id}
								className="todo-text"
								type="text"
								placeholder={`Новое название для ${editingProps.name}`}
								value={newName}
								onChange={handleChange}
							/>
						</div>
						<div className="btn-group">
							<button
								type="button"
								className="btn todo-cancel"
								onClick={() => {
									disabledDeleteButton()
									setEditing(false)
								}}
							>
								Отмена
							</button>
							<button type="submit" className="btn btn__primary todo-edit">
								Сохранение
							</button>
						</div>
					</form>
				) : (
					<h1>Задача не выбрана</h1>
				)}
			</div>
		</div>
	)
}

import React, { useEffect, useRef, useState } from 'react'


// Для фокуса последней используемой задачи
function usePrevious(value) {
	const ref = useRef()
	useEffect(() => {
		ref.current = value
	})
	return ref.current
}

export default function Todo(props) {

	// Ссылки для фокуса элементов при изменении состояния 
	const editFieldRef = useRef(null);
	const editButtonRef = useRef(null);

	// Для изменения состояния текущего рендеринга шаблона
	const [isEditing, setEditing] = useState(false)

	// Для изменения названия задачи
	const [newName, setNewName] = useState('')
	function handleChange(event) {
		setNewName(event.target.value)
	}

	const wasEditing = usePrevious(isEditing)

	// Для изменения названия задачи при нажатии на кнопку
	function handleSubmit(event) {
		event.preventDefault()
		if (newName.trim().length > 0) {
			props.editTask(props.id, newName)
			setNewName('')
		}
		setEditing(false)
	}

	// Шаблон компонента редактирования задачи
	const editingTemplate = (
		<form className='stack-small' onSubmit={handleSubmit}>
			<div className='form-group'>
				<input
					id={props.id}
					className='todo-text'
					type='text'
					placeholder={'Новое название для ' + props.name}
					onChange={handleChange}
					ref={editFieldRef}
				/>
			</div>
			<div className='btn-group'>
				<button type='button' className='btn todo-cancel' onClick={() => setEditing(false)}>
					Отмена
					<span className='visually-hidden'>переименования {props.name}</span>
				</button>
				<button type='submit' className='btn btn__primary todo-edit'>
					Сохранение
					<span className='visually-hidden'>нового названия для {props.name}</span>
				</button>
			</div>
		</form>
	)

	// Шаблон компонента просмотра задачи
	const viewTemplate = (
		<div className='stack-small'>
			<div className='c-cb'>
				<input
					id={props.id}
					type='checkbox'
					defaultChecked={props.completed}
					onChange={() => props.toggleTaskCompleted(props.id)}
				/>
				<label className='todo-label' htmlFor={props.id}>
					{props.name}
				</label>
			</div>
			<div className='btn-group'>
				<button
					type='button'
					className='btn'
					onClick={() => setEditing(true)}
					ref={editButtonRef}
				>
					Редактировать <span className='visually-hidden'>{props.name}</span>
				</button>
				<button
					type='button'
					className='btn btn__danger'
					onClick={() => props.deleteTask(props.id)}
				>
					Удалить <span className='visually-hidden'>{props.name}</span>
				</button>
			</div>
		</div>
	)

	// Проверяет, редактировалось ли поле до текущего клика
	useEffect(() => {
		// Если поле не редактировалось до текущего редактирования
		if (!wasEditing && isEditing)
			editFieldRef.current.focus()
		// Если поле редактировалось и не редактируется сейчас
		if (wasEditing && !isEditing)
			editButtonRef.current.focus()
	}, [wasEditing, isEditing]) // Запуск только при изменении значения

	return (
		<li className='todo stack-small'>{isEditing ? editingTemplate : viewTemplate}</li>
	)
}
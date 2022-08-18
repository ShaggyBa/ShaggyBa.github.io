import React, { useEffect } from 'react'

export default function Todo(props) {
	// Шаблон компонента просмотра задачи
	const viewTemplate = (
		<div className='stack-small'>
			<div className='c-cb'>
				<span
					id={props.id}
					className="todo-checkbox"
					onClick={() => props.toggleTaskCompleted(props.id)}
				/>
				<label className='todo-label' htmlFor={props.id} >
					<p>{props.name}</p>
				</label>
			</div>
			<div className='btn-group'>
				<button
					type='button'
					className='btn'
					onClick={() => props.getEditingTask(props)}
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

	useEffect(() => {
		props.changeStatus(props.id, props.completed)
	}, [])
	return (
		<li className='todo stack-small'>{viewTemplate}</li>
	)
}
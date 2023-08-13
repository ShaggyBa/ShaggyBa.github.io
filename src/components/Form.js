import React, { useState } from 'react'

export default function Form(props) {

	// Хук, следящий за вводимым значением и позволяющий изменять его
	const [taskName, setTaskName] = useState('')

	// Обработка формы для добавления задачи 
	function handleSubmit(event) {
		event.preventDefault()

		if (taskName.length > 0)
			// Передает вписанное в поле название задачи 
			props.addTask(taskName)

		setTaskName('')
	}

	function handleChange(event) {
		setTaskName(event.target.value)
	}

	return (
		<form onSubmit={handleSubmit}>
			<h2 className='label-wrapper'>
				<label htmlFor='new-todo-input' className='label__lg'>
					Что необходимо добавить?
				</label>
			</h2>
			<input
				type='text'
				id='new-todo-input'
				className='input input__lg'
				name='text'
				autoComplete='off'
				value={taskName}
				onChange={handleChange}
				maxLength='100'
			/>
			<button type='submit' className='btn btn__primary btn__lg'>
				Добавить
			</button>
		</form>
	)
}
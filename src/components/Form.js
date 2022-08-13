import React, { useState } from 'react'

export default function Form(props) {

	// Хук, следящий за вводимым значением и позволяющий изменять его
	const [name, setName] = useState('')

	// Обработка формы для добавления задачи 
	function handleSubmit(event) {
		event.preventDefault()
		console.log(event.target)
		if (name.trim().length != 0)
			if (name.trim().length >= 48)
				props.addTask(name.trim().split('').splice(0, 48).concat(['.', '.', '.']).join(''))
			else
				// Передает вписанное в поле название задачи 
				props.addTask(name)
		setName('')
	}

	function handleChange(event) {
		setName(event.target.value)
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
				value={name}
				onChange={handleChange}
			/>
			<button type='submit' className='btn btn__primary btn__lg'>
				Добавить
			</button>
		</form>
	)
}
import React from 'react'

export default function FilterButton(props) {
	return (
		<button
			type='button'
			className='btn toggle-btn'
			aria-pressed={props.isPressed}
			onClick={() => props.setFilter(props.name)}
		>
			<span className='visually-hidden'>Показать </span>
			<span>{props.name}</span>
			<span className='visually-hidden'> задачи</span>
		</button>
	)

}
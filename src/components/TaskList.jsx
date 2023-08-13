import FILTER_MAP from "../data/filters/filter";
import Todo from "./Todo";

export const TaskList = (props) => {

	const tasks = props.tasks.filter(FILTER_MAP[props.filter]).map((task) => (
		<Todo
			name={task.name}
			id={task.id}
			completed={task.completed}
			key={task.id}
			toggleTaskCompleted={props.actions.toggleTaskCompleted}
			deleteTask={props.actions.deleteTask}
			editTask={props.actions.editTask}
			changeStatus={props.actions.changeStatus}
			getEditingTask={props.actions.getEditingTask}
		/>
	))

	const headingText =
		tasks.length === 1
			? `${tasks.length} задача`
			: `${tasks.length} задач`

	return (
		<div className="list--block">
			<h2 id="list-heading">{headingText}</h2>
			<ul role="list" className="todo-list stack-large stack-exception">
				{tasks}
			</ul>
		</div>
	)
} 
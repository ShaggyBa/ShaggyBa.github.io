// Фильтры кнопок для сортировки задач
const FILTER_MAP = {
	"Все": () => true,
	"Активные": (task) => !task.completed,
	"Выполненные": (task) => task.completed
}

export default FILTER_MAP
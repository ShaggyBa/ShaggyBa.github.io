import FilterButton from "./FilterButton"

import FILTER_MAP from "../data/filters/filter"

export const FilterList = (props) => {
	const filters = Object.keys(FILTER_MAP).map((name) => (
		<FilterButton
			name={name}
			key={name}
			isPressed={name === props.filter}
			setFilter={props.setFilter}
		/>))

	return (
		<div className="filters btn-group stack-exception">
			{filters}
		</div>
	)
}
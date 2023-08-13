import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import DATA from './data/data'


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<App tasks={DATA} />
	</React.StrictMode>
)

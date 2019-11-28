import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import './assets/styles/default.scss'
import App from './App'
import * as serviceWorker from './serviceWorker'

const Leo = withRouter(props => <App {...props}/>)

ReactDOM.render(
	<Router>
		<Leo />
	</Router>,
	document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
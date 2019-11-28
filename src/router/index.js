import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'

import Intro from '../containers/Intro'

import PublicRoute from '../components/PublicRoute'

export default () => (
	<BrowserRouter>
		<Switch>
			<PublicRoute restricted={true} component={Intro} path={'/'} exact />
		</Switch>
	</BrowserRouter>
)
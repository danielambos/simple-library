import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'

import Intro from '../containers/Intro'
import Library from '../containers/Library'
import Search from '../containers/Search'
import Report from '../containers/Report'
import Details from '../containers/Details'

import PrivateRoute from '../components/PrivateRoute'
import PublicRoute from '../components/PublicRoute'

export default () => (
	<BrowserRouter>
		<Switch>
			<PublicRoute restricted={true} component={Intro} path={'/'} exact />
			<PrivateRoute component={Library} path={'/library'} exact />
			<PrivateRoute component={Search} path={'/search'} exact />
			<PrivateRoute component={Report} path={'/report'} exact />
			<PrivateRoute component={Details} path={'/library/:bookId'} />
		</Switch>
	</BrowserRouter>
)
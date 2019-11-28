import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

import { Creators } from '../store/ducks/user'

class PrivateRoute extends Component {
	ready = false

	componentDidMount() {
		this.ready = true
		this.props.onLoadUser()
	}

	componentWillUnmount() {
		this.ready = false	
	}

	render() {
		const route = (
			<Route {...this.props} />
		)

		const redirect = (
			<Redirect to={'/'} />
		)

		if(!this.ready) {
			return null
        }

		return this.props.user && this.props.user.name ? route : redirect
	} 
}

export default connect(
    state => ({
        user: state.user.user,
		loadingUser: state.user.loadingUser
    }),
    dispatch => ({
        onLoadUser: () => {
			dispatch(Creators.loadUser())
		}
    })
)(PrivateRoute)
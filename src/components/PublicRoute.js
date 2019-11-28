import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

import { Creators } from '../store/ducks/user'

class PublicRoute extends Component {
	ready = false

	componentDidMount() {
		this.ready = true
		this.props.onLoadUser()
	}

	componentWillUnmount() {
		this.ready = false	
	}

	render() {
		const { restricted } = this.props
		
		const route = (
			<Route {...this.props} />
		)

		const redirect = (
			<Redirect to={'/library'} />
		)

		if(!this.ready) {
			return null
        }

		return this.props.user && this.props.user.name && restricted ? redirect : route
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
)(PublicRoute)
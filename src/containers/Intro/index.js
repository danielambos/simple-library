import React, { Component } from 'react'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'

import { Creators } from '../../store/ducks/user'
import Input from '../../components/Input'
import Button from '../../components/Button'
import logo from '../../assets/images/logo.svg'
import './style.scss'

class Intro extends Component {
	constructor(props) {
		super(props)

		this.state = {
			name: ''
		}

		this.register = this.register.bind(this)
	}

	register = async(event) => {
		event.preventDefault()

		if (this.state.name) {
			await this.props.onRegisterUser({
				name: this.state.name
			})

			if (this.props.user) {
				this.props.history.push('/library')
			} else if(this.props.error) {
				Swal.fire({
					title: 'Error!',
					text: this.props.error,
					type: 'error',
					confirmButtonText: 'OK'
				})
			}
		} else {
			Swal.fire({
				title: 'Error!',
				text: 'Please enter your name to continue.',
				type: 'error',
				confirmButtonText: 'OK'
			})
		}
	}

	render() {
		const {
			name
		} = this.state

		return (
			<div className={'intro'}>
				<form className={'intro__container'} onSubmit={this.register}>
					<svg className={'intro__logo'}>
						<use xlinkHref={`${logo}#logo`} />
					</svg>
					<h1 className={'intro__title'}>Simple Library</h1>
					<p className={'intro__text'}>Welcome to Simple Library, it's an online library for managing your books. <br/><br/>Enter your name to continue!</p>
					<Input
						id={'name'}
						label={false}
						name={'name'}
						type={'text'}
						placeholder={'Name'}
						value={name}
						onChange={(name, value) => {this.setState({'name': value})}}
					/>
					<Button
						title={'Go!'}
						type={'submit'}
						loading={this.props.loadingRegisterUser}
					/>
				</form>
			</div>
		)
	}
}

export default connect(
    state => ({
        user: state.user.user,
		loadingRegisterUser: state.user.loadingRegisterUser,
		error: state.user.error
    }),
    dispatch => ({
        onRegisterUser: (data) => {
			dispatch(Creators.registerUser(data))
		}
    })
)(Intro)
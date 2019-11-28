import React, { Component } from 'react'

import Header from '../../components/Header'
import Navbar from '../../components/Navbar'

import './style.scss'

class Library extends Component {
	render() {
		return (
			<div className={'library page'}>
				<Header current={'library'} />
				
				<Navbar current={'library'} />
			</div>
		)
	}
}

export default Library
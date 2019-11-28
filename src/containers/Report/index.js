import React, { Component } from 'react'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'

import './style.scss'

class Report extends Component {
	render() {
		return (
			<div className={'report page'}>
				<Header current={'report'} />

				<Navbar current={'report'} />
			</div>
		)
	}
}

export default Report
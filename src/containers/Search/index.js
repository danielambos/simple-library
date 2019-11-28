import React, { Component } from 'react'

import Header from '../../components/Header'
import Navbar from '../../components/Navbar'

import './style.scss'

class Search extends Component {
	render() {
		return (
			<div className={'search page'}>
				<Header current={'search'} />
				
				<Navbar current={'search'} />
			</div>
		)
	}
}

export default Search
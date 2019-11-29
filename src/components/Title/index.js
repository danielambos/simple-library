import React, { Component } from 'react'
import './style.scss'

class Title extends Component {
	render() {
		let text = this.props.text

		return (
			<h2 className={'title'}>{ text }</h2>
		)
	}
}

export default Title
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Creators } from '../../store/ducks/book'

import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import ReportList from '../../components/ReportList'
import Title from '../../components/Title'

import './style.scss'

class Report extends Component {
	constructor(props) {
		super(props)

		this.state = {
			year: new Date().getFullYear()
		}

		this.setValue = this.setValue.bind(this)
	}

	componentDidMount() {
		this.props.onLoadReport()
	}

	setValue(name, value) {
		this.setState({[name]: value})
	}

	render() {
		const {
			year
		} = this.state

		return (
			<div className={'report page'}>
				<Header current={'report'} />

				<div className={'limit-grid'}>
					<Title text={'Annual Report'} />

					{this.props.years && this.props.options &&
						<ReportList
							years={this.props.years}
							options={this.props.options}
							year={year}
							setValue={this.setValue}
						/>
					}
				</div>

				<Navbar current={'report'} />
			</div>
		)
	}
}

export default connect(
	state => ({
		years: state.book.years,
		options: state.book.options
	}),
	dispatch => ({
		onLoadReport: () => {
			dispatch(Creators.loadReport())
		}
	})
)(Report)
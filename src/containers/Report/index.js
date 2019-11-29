import React, { Component } from 'react'

import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import ReportList from '../../components/ReportList'
import Title from '../../components/Title'

import './style.scss'

class Report extends Component {
	constructor(props) {
		super(props)

		this.state = {
			report: {},
			options: [],
			year: new Date().getFullYear()
		}

		this.setValue = this.setValue.bind(this)
	}

	componentDidMount() {
		this.loadReport()
	}

	setValue(name, value) {
		this.setState({[name]: value})
	}

	loadReport = async() => {
		let report = localStorage.getItem('report'),
			years = report ? JSON.parse(report) : {},
			options = []

		for (let prop in years) {
			options.push({title: prop, value: prop})
		}

		this.setState({
			report: years,
			options: options
		})
	}

	render() {
		const {
			report,
			year,
			options
		} = this.state

		return (
			<div className={'report page'}>
				<Header current={'report'} />

				<div className={'limit-grid'}>
					<Title text={'Annual Report'} />

					<ReportList
						report={report}
						options={options}
						year={year}
						setValue={this.setValue}
					/>
				</div>

				<Navbar current={'report'} />
			</div>
		)
	}
}

export default Report
import React from 'react'

import Select from '../../components/Select'
import './style.scss'

const ReportList = (props) => {
	const {
		report,
		options,
		year,
		setValue
	} = props

	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

	return (
		<div className={'report-list'}>
			<Select
				id={'year'}
				label={'Select the year to view the report:'}
				name={'year'}
				selected={year}
				options={options}
				onChange={setValue}
			/>

			<h3 className={'report-list__year'}>Report readed books in {year}</h3>

			{report && year in report && 
				report[year].map((month, index) =>
					<div key={index}>
						<p className={'report-list__title'}>{months[index]} <i>({month.length})</i></p>
						<ul>
							{month.map((book, i) =>
								<li className={'report-list__item'} key={i}>{book.title}</li>
							)}
						</ul>
					</div>
				)
			}
		</div>
	)
}

export default ReportList
import React from 'react'

import Select from '../../components/Select'
import './style.scss'

const ReportList = (props) => {
	const {
		years,
		options,
		year,
		setValue
	} = props

	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

	let total = 0

	if(years && year in years) { 
		years[year].forEach((month) => {
			total+= month.length
		})
	}

	return (
		<div className={'report-list'}>
			{options.length ?
				<Select
					id={'year'}
					label={'Select the year to view the report:'}
					name={'year'}
					selected={year}
					options={options}
					onChange={setValue}
				/>
				:
				''
			}

			<h3 className={'report-list__year'}>Readed books in {year}: <b>{total}</b></h3>

			{years && year in years && total &&
				years[year].map((month, index) =>
					<div className={'report-list__item'} key={index}>
						<p className={'report-list__title'}>{months[index]}</p>
						{month.length ?
							<ul>
								{month.map((book, i) =>
									<li className={'report-list__books'} key={i}>{book.title}</li>
								)}
							</ul>
							:
							<p className={'report-list__text'}>No books</p>
						}
					</div>
				)
			}
		</div>
	)
}

export default ReportList
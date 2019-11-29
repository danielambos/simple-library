import React from 'react'

import ListItem from './SearchListItem'
import './style.scss'

const SearchList = (props) => {
	const {
		total,
		books,
		handleAdd
	} = props

	return (
		<div className={'search-list'}>
			{books && books.length > 0 ?
				<div>
					<p className={'search-list__text'}>{total} books found:</p>
					<ul>
						{books.map((book, index) =>
							<ListItem book={book} key={index} handleAdd={handleAdd} />
						)}
					</ul>
				</div>
				:
				<p className={'search-list__text'}>Your search didn't match any book.</p>
			}
		</div>
	)
}

export default SearchList
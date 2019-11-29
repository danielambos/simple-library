import React from 'react'
import { Link } from 'react-router-dom'

import checked from '../../../assets/images/checked.svg'
import image from '../../../assets/images/image.jpg'
import './style.scss'

const BookListItem = (props) => {
	const {
		book
	} = props

	return (
		<li className={'book-list-item'}>
			<Link to={`/book/${book.id}`}>
				<img className={'book-list-item__image'} src={book.cover ? `https://covers.openlibrary.org/b/id/${book.cover}-M.jpg` : image} alt={book.title} />
				<p className={`book-list-item__title ${book.read && 'book-list-item__title--read'}`}>{book.title}</p>
				{book.read &&
					<svg className={'book-list-item__icon'}>
						<use xlinkHref={`${checked}#checked`} />
					</svg>
				}
			</Link>
		</li>
	)
}

export default BookListItem